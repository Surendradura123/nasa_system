import Apod from "../components/Apod";
import Mars from "../components/Mars";
import Epic from "../components/Epic";
import NeoChart from "../components/NeoChart";
import NeoStats from "../components/NeoStats";
import Search from "../components/Search";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-8">

      {/* 🌅 HERO */}
      <Apod />

      {/* 📊 STATS */}
      <NeoStats />

      {/* 📈 CHART */}
      <NeoChart />

      {/* 🌍 EPIC */}
      <Epic />

      {/* 🚗 MARS */}
      <Mars />

      {/* 🔍 SEARCH */}
      <Search />

    </div>
  );
}