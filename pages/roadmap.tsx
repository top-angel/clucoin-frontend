import React from "react";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import axios from "axios";
import Head from "next/head";
import { CLUPANEL_API_URL } from "../constants";
import RoadMapRender from "../components/Roadmap";

interface Props {
  roadmap: any;
  roadmapQuarter: any;
  roadmapDetail: any;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const roadmap = await axios
    .get(CLUPANEL_API_URL + "/roadmaps?_sort=id:asc")
    .then((res) => res.data);

  const roadmapQuarter = await axios
    .get(CLUPANEL_API_URL + "/roadmap-quarters?_sort=id:asc")
    .then((res) => res.data);

  const roadmapDetail = await axios
    .get(CLUPANEL_API_URL + "/roadmap-details?_sort=id:asc")
    .then((res) => res.data);

  return {
    props: {
      roadmap,
      roadmapQuarter,
      roadmapDetail,
    },
  };
};

const Roadmap: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ roadmap, roadmapQuarter, roadmapDetail }) => {
  return (
    <>
      <Head>
        <title>CluCoin - RoadMap</title>
      </Head>
      <div className="RoadMapPage">
        <div className="Container">
          <h2 className="RoadMapTitle">Our Roadmap</h2>
          <RoadMapRender rd={roadmap} rdq={roadmapQuarter} rdd={roadmapDetail} />
        </div>
      </div>
    </>
  );
};

export default Roadmap;
