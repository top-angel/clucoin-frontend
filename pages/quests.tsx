import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Quest, Seasons, Season, NFT } from "../types";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import axios from "axios";
import { API_URI, AUTH_URI } from "../constants";
import { useUser } from "../stores/useUser";
import Head from "next/head";
import toast from "react-hot-toast";
import Refresh from "../icons/Refresh";
import MetaTags from "../components/MetaTags";
import { useCountdown } from "../hooks/useCountdown";
import { useLivePrice } from "../hooks/usePrice";

interface Props {
  seasons: ({
    quests: ({ nft: { available: number } & NFT } & Quest)[];
  } & Season)[];
  quest?: number;
  task?: number;
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const quest = +ctx.query.quest;
  const task = +ctx.query.task;

  const seasons = await axios
    .get<{ data: Seasons }>(API_URI + "/v1/seasons/")
    .then((res) => res.data.data)
    .then((seasons) =>
      Promise.all(
        seasons.map((season) =>
          Promise.all(
            season.quests.map((quest) =>
              axios
                .get<{ value: number }>(
                  API_URI + `/v1/nft/remaining/${quest.nft.token_id}`
                )
                .then((res) => res.data)
                .then((d) => d.value)
            )
          ).then((quest_nfts) => {
            return {
              ...season,
              quests: season.quests.map((quest, i) => ({
                ...quest,
                nft: {
                  ...quest.nft,
                  available: quest_nfts[i],
                },
              })),
            };
          })
        )
      )
    );

  return {
    props: {
      seasons,
      quest,
      task,
    },
  };
};

const Quests: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> =
  ({ seasons, quest, task }) => {
    const [openQuests, setOpenQuests] = useState({});
    const [currentSeason, setCurrentSeason] = useState(0);

    const price = useLivePrice();
    const { token, user, updateUser } = useUser();

    const sm = useMediaQuery({ maxWidth: 580 });
    const md = useMediaQuery({ maxWidth: 810 });
    const lg = useMediaQuery({ maxWidth: 1024 });

    const rowLength = useMemo(() => {
      if (sm) {
        return 1;
      } else if (md) {
        return 2;
      } else if (lg) {
        return 3;
      } else {
        return 4;
      }
    }, [sm, md, lg]);

    const openQuest = useCallback(
      (i: number) => {
        const row = Math.floor(i / rowLength);
        setOpenQuests((openQuests) => ({ ...openQuests, [row]: i }));
      },
      [rowLength]
    );

    useEffect(() => {
      const newQuests = {};
      Object.values(openQuests).forEach((v) => {
        const row = Math.floor(+v / rowLength);
        newQuests[row] = v;
      });
      setOpenQuests(newQuests);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSeason, rowLength]);

    useEffect(() => {
      if (quest != null && !isNaN(quest) && task != null && !isNaN(task)) {
        const season = seasons.findIndex(
          (season) => !!season.quests.find((q) => +q.id == quest)
        );

        if (season > -1) {
          const quest_id = seasons[season].quests.findIndex((q) =>
            q.tasks.find((t) => +t.id == task)
          );

          if (quest_id > -1 && quest_id == quest) {
            setCurrentSeason(season);
            openQuest(quest);
          }
        }
      } else if (quest != null && !isNaN(quest)) {
        const season = seasons.findIndex(
          (season) => !!season.quests.find((q) => +q.id == quest)
        );

        if (season > -1) {
          setCurrentSeason(season);
          openQuest(quest);
        }
      } else if (task != null && !isNaN(task)) {
        const season = seasons.findIndex(
          (season) =>
            !!season.quests.find((q) => !!q.tasks.find((t) => +t.id == task))
        );

        if (season > -1) {
          const quest = seasons[season].quests.findIndex((q) =>
            q.tasks.find((t) => +t.id == task)
          );

          if (quest > -1) {
            setCurrentSeason(season);
            openQuest(quest);
          }
        }
      }
    }, [quest, seasons, task, openQuest]);

    const isQuestOpen = (i: number): boolean => {
      return Object.values(openQuests).find((v) => v == i) != undefined;
    };

    const reloadTasks = useCallback(() => {
      toast
        .promise(
          axios
            .post<string[]>(
              AUTH_URI + "/v1/users/@me/checktasks",
              {},
              { headers: { Authorization: token } }
            )
            .then((res) => res.data),
          {
            loading: "Updating tasks",
            success: "Tasks updated",
            error: "Failed to update tasks",
          }
        )
        .then((tasks) => updateUser({ completed_tasks: tasks }));
    }, [token, updateUser]);

    const dayCountdown = useCountdown(
      new Date(2021, 8, new Date().getUTCDate() + 1)
    );
    const questCountdown = useCountdown(new Date(2021, 7, 29));

    const tasksAdditions = useMemo(
      () => ({
        0: (() => {
          return price
            ? ` (total: $${(price * 100_000_000 * 2).toLocaleString("en-US", {
                maximumFractionDigits: 2,
              })})`
            : undefined;
        })(),
      }),
      [price]
    );

    return (
      <>
        <Head>
          <title>CluCoin - Quests</title>
          <MetaTags
            title="CLUCoin"
            description="CluCoin is a deflationary smart token with a long term charity focus and vision."
            image={{
              url: "https://cdn.discordapp.com/attachments/455777545485549589/861600665575227452/Outbound_Oasis_1920_x_1080_Version.jpg",
              width: 1200,
              height: 630,
              alt: "CluCoin is a deflationary smart token with a long term charity focus and vision.",
            }}
          />
        </Head>
        <div className="Container">
          <h1 className="quests-title">Quests</h1>
          <p className="quests-description">
            Complete tasks to earn exclusive rewards! Rewards are only available
            for a limited time.
          </p>
          <div className="seasons-container">
            <div className="seasons-list">
              {seasons.map((season, i) => (
                <span
                  key={season.id}
                  className={currentSeason == i ? "selected" : undefined}
                  onClick={() => setCurrentSeason(i)}
                >
                  {season.name}
                </span>
              ))}
            </div>
            <div className="season-info">Master CLU quest coming soon</div>
            {dayCountdown && (
              <div className="countdown">
                Next day starts in{" "}
                {[
                  dayCountdown.days && `${dayCountdown.days} days`,
                  dayCountdown.hours && `${dayCountdown.hours} hours`,
                  dayCountdown.mins && `${dayCountdown.mins} minutes`,
                  dayCountdown.seconds && `${dayCountdown.seconds} seconds`,
                ]
                  .filter((v) => !!v)
                  .join(", ")}
              </div>
            )}
            {questCountdown && (
              <div className="countdown">
                Limited edition Radiant Insight NFT ends in{" "}
                {[
                  questCountdown.days && `${questCountdown.days} days`,
                  questCountdown.hours && `${questCountdown.hours} hours`,
                  questCountdown.mins && `${questCountdown.mins} minutes`,
                  questCountdown.seconds && `${questCountdown.seconds} seconds`,
                ]
                  .filter((v) => !!v)
                  .join(", ")}
              </div>
            )}
            <div className="quests-container">
              {new Array(
                Math.ceil(seasons[currentSeason].quests.length / rowLength)
              )
                .fill(0)
                .map((_, i) => (
                  <div key={i}>
                    <div className="quests-list">
                      {seasons[currentSeason].quests
                        .slice(
                          i * rowLength,
                          Math.min(
                            (i + 1) * rowLength,
                            seasons[currentSeason].quests.length
                          )
                        )
                        .map((quest, j) => (
                          <div
                            key={quest.id}
                            className={
                              "quest" +
                              (isQuestOpen(j + i * rowLength)
                                ? " selected"
                                : "")
                            }
                            onClick={() => {
                              if (!isQuestOpen(j + i * rowLength)) {
                                openQuest(j + i * rowLength);
                                return;
                              }

                              const newQuests = {};
                              Object.keys(openQuests).forEach((v) => {
                                if (+v == i) return;
                                newQuests[v] = openQuests[v];
                              });
                              setOpenQuests(newQuests);
                            }}
                          >
                            <div className="image">
                              <Image
                                alt=""
                                height={248}
                                width={248}
                                className="img"
                                src={
                                  quest.nft?.image_url ||
                                  "https://gateway.pinata.cloud/ipfs/QmU8G8LV9seMLS22VP4ahF2Af8pe6hPtWrsSbxoxo255F7"
                                }
                              />
                            </div>
                            <h6
                              className="limit"
                              style={{
                                visibility: quest.nft.limited
                                  ? "visible"
                                  : "hidden",
                              }}
                            >
                              <span className="available">
                                {quest.nft.available}
                              </span>{" "}
                              of {quest.nft.limited_count} Available
                            </h6>
                            <h5 className="title">{quest.name}</h5>
                            {user && (
                              <div className="progress">
                                <span>
                                  {
                                    quest.tasks.filter(
                                      (t) =>
                                        !!user?.completed_tasks.find(
                                          (tt) => tt == t.id
                                        )
                                    ).length
                                  }{" "}
                                  / {quest.tasks.length} tasks
                                </span>
                                <div
                                  className="bar"
                                  style={{
                                    opacity:
                                      (quest.tasks
                                        .map(
                                          (t) =>
                                            !!user?.completed_tasks.find(
                                              (tt) => tt == t.id
                                            )
                                        )
                                        .filter((s) => s).length /
                                        quest.tasks.length) *
                                        100 ==
                                      0
                                        ? 0
                                        : 1,
                                    width: `${
                                      (quest.tasks
                                        .map(
                                          (t) =>
                                            !!user?.completed_tasks.find(
                                              (tt) => tt == t.id
                                            )
                                        )
                                        .filter((s) => s).length /
                                        quest.tasks.length) *
                                      100
                                    }%`,
                                  }}
                                ></div>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                    {(() => {
                      const quest = seasons[currentSeason].quests.find(
                        (v, j) => j == openQuests[i]
                      );

                      if (!quest) return;

                      return (
                        <div className="tasks-list">
                          <div className="info">
                            <h4 className="quest-name">{quest.name}</h4>
                            {user ? (
                              <>
                                <div className="progress">
                                  <span>Progress</span>
                                  <div
                                    className="bar"
                                    style={{
                                      opacity:
                                        (quest.tasks
                                          .map(
                                            (t) =>
                                              !!user.completed_tasks.find(
                                                (tt) => tt == t.id
                                              )
                                          )
                                          .filter((s) => s).length /
                                          quest.tasks.length) *
                                          100 ==
                                        0
                                          ? 0
                                          : 1,
                                      width: `${
                                        (quest.tasks
                                          .map(
                                            (t) =>
                                              !!user.completed_tasks.find(
                                                (tt) => tt == t.id
                                              )
                                          )
                                          .filter((s) => s).length /
                                          quest.tasks.length) *
                                        100
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                                <Refresh onClick={reloadTasks} />
                              </>
                            ) : null}
                          </div>
                          {quest.tasks.map((task) => (
                            <div
                              className={`task ${
                                user?.completed_tasks.find((t) => t == task.id)
                                  ? "finished"
                                  : ""
                              }`}
                              key={task.id}
                            >
                              {task.detail}
                              {tasksAdditions[task.id] ?? ""}
                              <span>
                                {user?.completed_tasks.find(
                                  (t) => t == task.id
                                ) ? (
                                  <svg
                                    width="21"
                                    height="16"
                                    viewBox="0 0 21 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M2 6.8524L6.93639 13L19 2"
                                      stroke="#EF008E"
                                      strokeWidth="3"
                                    />
                                  </svg>
                                ) : null}
                              </span>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </>
    );
  };

export default Quests;
