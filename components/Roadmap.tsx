import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faDotCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  rd: { icon: string; title: string }[];
  rdq: { title: string }[];
  rdd: { description: string }[];
}

const RoadMapRender = (props: Props) => {
  let iconOne = [];
  for (let i = 0; i < props.rd.length; i++) {
    if (props.rd[i].icon == "faCheck") iconOne.push(faCheck);
    else if (props.rd[i].icon == "faDotCircle") iconOne.push(faDotCircle);
    else if (props.rd[i].icon == "faTimes") iconOne.push(faTimes);
  }

  return (
    <ul className="RoadMap">
      <li className="MapInverted">
        <div className="MapCircle"></div>
        <div className="RoadMapPanel">
          <div className="RoadMapHeader">
            <p className="Title">{props.rdq[0].title}</p>
          </div>

          <div className="RoadMapBody">
            <div className="RoadMapAchievements">
              <div className="Achievement">
                <div className="AchievementDescription">
                  <p className="AchievementTitle">
                    <FontAwesomeIcon icon={iconOne[0]} /> {props.rd[0].title}
                  </p>
                  <ul className="AchievementList">
                    <li>
                      <p>{props.rdd[0].description}</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="Achievement">
                <div className="AchievementDescription">
                  <p className="AchievementTitle">
                    <FontAwesomeIcon icon={iconOne[1]} /> {props.rd[1].title}
                  </p>
                  <ul className="AchievementList">
                    <li>
                      <p>{props.rdd[1].description}</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="Achievement">
                <div className="AchievementDescription">
                  <p className="AchievementTitle">
                    <FontAwesomeIcon icon={iconOne[2]} /> {props.rd[2].title}
                  </p>
                  <ul className="AchievementList">
                    <li>
                      <p>{props.rdd[2].description}</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="Achievement">
                <div className="AchievementDescription">
                  <p className="AchievementTitle">
                    <FontAwesomeIcon icon={iconOne[3]} /> {props.rd[3].title}
                  </p>
                  <ul className="AchievementList">
                    <li>
                      <p>{props.rdd[3].description}</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="Achievement">
                <div className="AchievementDescription">
                  <p className="AchievementTitle">
                    <FontAwesomeIcon icon={iconOne[4]} /> {props.rd[4].title}
                  </p>
                  <ul className="AchievementList">
                    <li>
                      <p>{props.rdd[4].description}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>

      <li>
        <div className="MapCircle"></div>
        <div className="RoadMapPanel">
          <div className="RoadMapHeader">
            <p className="Title">{props.rdq[1].title}</p>
          </div>

          <div className="RoadMapBody">
            <div className="RoadMapAchievements">
              <div className="Achievement">
                <div className="AchievementDescription">
                  <p className="AchievementTitle">
                    <FontAwesomeIcon icon={iconOne[5]} /> {props.rd[5].title}
                  </p>
                  <ul className="AchievementList">
                    <li>
                      <p>{props.rdd[5].description}</p>
                    </li>
                    <li>
                      <p>{props.rdd[6].description}</p>
                    </li>
                    <li>
                      <p>{props.rdd[7].description}</p>
                    </li>
                    <li>
                      <p>{props.rdd[8].description}</p>
                    </li>
                    <li>
                      <p>{props.rdd[9].description}</p>
                    </li>
                    <li>
                      <p>{props.rdd[10].description}</p>
                    </li>
                    <li>
                      <p>{props.rdd[11].description}</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="Achievement">
                <div className="AchievementDescription">
                  <p className="AchievementTitle">
                    <FontAwesomeIcon icon={iconOne[6]} /> {props.rd[6].title}
                  </p>
                  <ul className="AchievementList">
                    <li>
                      <p>{props.rdd[12].description}</p>
                    </li>
                    <li>
                      <p>{props.rdd[13].description}</p>
                    </li>
                    <li>
                      <p>{props.rdd[14].description}</p>
                    </li>
                    <li>
                      <p>{props.rdd[15].description}</p>
                    </li>
                    <li>
                      <p>{props.rdd[16].description}</p>
                    </li>
                    <li>
                      <p>{props.rdd[17].description}</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="Achievement">
                <div className="AchievementDescription">
                  <p className="AchievementTitle">
                    <FontAwesomeIcon icon={iconOne[7]} /> {props.rd[7].title}
                  </p>
                  <ul className="AchievementList">
                    <li>
                      <p>{props.rdd[18].description}</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="Achievement">
                <div className="AchievementDescription">
                  <p className="AchievementTitle">
                    <FontAwesomeIcon icon={iconOne[8]} /> {props.rd[8].title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>

      <li className="MapInverted">
        <div className="MapCircle"></div>
        <div className="RoadMapPanel">
          <div className="RoadMapHeader">
            <p className="Title">{props.rdq[2].title}</p>
          </div>

          <div className="RoadMapBody">
            <div className="RoadMapAchievements">
              <div className="Achievement">
                <div className="AchievementDescription">
                  <p className="AchievementTitle">
                    <FontAwesomeIcon icon={iconOne[9]} /> {props.rd[9].title}
                  </p>
                  <ul className="AchievementList">
                    <li>
                      <p>{props.rdd[19].description}</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="Achievement">
                <div className="AchievementDescription">
                  <p className="AchievementTitle">
                    <FontAwesomeIcon icon={iconOne[10]} /> {props.rd[10].title}
                  </p>
                  <ul className="AchievementList">
                    <li>
                      <p>{props.rdd[20].description}</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="Achievement">
                <div className="AchievementDescription">
                  <p className="AchievementTitle">
                    <FontAwesomeIcon icon={iconOne[11]} /> {props.rd[11].title}
                  </p>
                  <ul className="AchievementList">
                    <li>
                      <p>{props.rdd[21].description}</p>
                    </li>
                    <li>
                      <p>{props.rdd[22].description}</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="Achievement">
                <div className="AchievementDescription">
                  <p className="AchievementTitle">
                    <FontAwesomeIcon icon={iconOne[12]} /> {props.rd[12].title}{" "}
                  </p>
                  <ul className="AchievementList">
                    <li>
                      <p>{props.rdd[23].description}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>

      <li>
        <div className="MapCircle"></div>
        <div className="RoadMapPanel">
          <div className="RoadMapHeader">
            <p className="Title">{props.rdq[3].title}</p>
          </div>

          <div className="RoadMapBody">
            <div className="RoadMapAchievements">
              <div className="Achievement">
                <div className="AchievementDescription">
                  <p className="AchievementTitle">
                    {props.rdd[24].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li className="clearfix" style={{ float: "none" }}></li>
    </ul>
  );
};

export default RoadMapRender;
