import React from "react";
import { withApollo } from "../lib/apollo";
import Layout from "../components/Layout";
import HabitList from "../components/HabitList";

const Home = () => (
  <Layout>
    <div>
      <div className="hero">
        <h1 className="title">Level Up Your Life!</h1>
        <HabitList />
      </div>

      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }
      `}</style>
    </div>
  </Layout>
);

export default withApollo(Home);
