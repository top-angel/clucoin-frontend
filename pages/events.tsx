import Head from "next/head";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import axios from "axios";

import { Event } from "../types";
import { CLUPANEL_API_URL } from "../constants";
import { monthNames } from "../utils/date";
import dynamic from "next/dynamic";
import MetaTags from "../components/MetaTags";

interface Props {
  events: Event[];
}

const Markdown = dynamic(import("../components/Markdown"), { ssr: false });

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const data = await axios
    .get<Event[]>(CLUPANEL_API_URL + "/events")
    .then((res) => res.data);

  return {
    props: {
      events: data,
    },
  };
};

const Events: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> =
  ({ events }) => {
    return (
      <>
        <Head>
          <title>CLUCoin - Events</title>
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
          <div className="EventsBody">
            <div className="EventsHeader">
              <h1 className="EventsTitle">Events</h1>
              <p className="EventsDescription">
                Community is at the heart of what we do.
              </p>
            </div>
            {events ? (
              <div className="EventsGrid">
                {events
                  .sort(
                    (a, b) =>
                      new Date(a.date).getTime() - new Date(b.date).getTime()
                  )
                  .map((event) => (
                    <div key={event.id} className="Event">
                      <div className="EventHeader">
                        <img
                          src={`https://cdn.clucoin.com/${event.image.hash}${event.image.ext}`}
                          alt={event.title}
                        />
                      </div>
                      <div className="EventDescription">
                        <div className="EventTitle">
                          <div className="EventDate">
                            <p className="EventDay">
                              {new Date(event.date).getDate()}
                            </p>
                            <span className="EventMonth">
                              {monthNames[new Date(event.date).getMonth()]}
                            </span>
                          </div>
                          <p className="EventName">{event.title}</p>
                        </div>
                        <p className="EventAbout">
                          <Markdown>{event.description}</Markdown>
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p style={{ textAlign: "center" }}>
                There are no events at the moment, come back later
              </p>
            )}
          </div>
        </div>
      </>
    );
  };

export default Events;
