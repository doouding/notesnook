import React, { useEffect } from "react";
import Logo from "../assets/notesnook-logo.png";
import { initializeDatabase } from "../common/db";

function Splash(props) {
  useEffect(() => {
    (async function () {
      try {
        await initializeDatabase();
      } catch (e) {
        // captureException(e, (scope) => {
        //   scope.setExtra("where", "db.init");
        //   return scope;
        // });
        console.error(e);
        alert("Error: " + `Error initializing database: ${e.message}`);
      } finally {
        props.onLoadingFinished();
      }
    })();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img alt="Notesnook logo" src={Logo} width={150} />
    </div>
  );
}
export default Splash;
