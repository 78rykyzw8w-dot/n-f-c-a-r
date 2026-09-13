(function () {

  const SUPABASE_URL =
    "https://vxzqicqytfwarvnjtae.supabase.co";

  const SUPABASE_KEY =
    "sb_publishable_nYtSXjPDIYiMWDIieLnC_g_r9LEqOqf";

  const script = document.createElement("script");

  script.src =
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

  script.onload = async function () {

    try {

      const supabase =
        window.supabase.createClient(
          SUPABASE_URL,
          SUPABASE_KEY
        );

      const params =
        new URLSearchParams(
          window.location.search
        );

      const nfcId =
        params.get("id");

      if (!nfcId) return;

      const result =
        await supabase
          .from("vehicles")
          .select("*")
          .eq("id", nfcId)
          .eq("active", true)
          .maybeSingle();

      console.log("NFCAR SUPABASE RESULT:", result);

      if (result.error) {

        alert(
          "SUPABASE HATASI:\n\n" +
          result.error.message
        );

        return;
      }

      if (!result.data) {

        alert(
          "SUPABASE BAĞLANDI AMA ARAÇ GELMEDİ.\n\n" +
          "Aranan ID: " +
          nfcId
        );

        return;
      }

      const data = result.data;

      const name =
        document.querySelector(
          ".vehicle-name"
        );

      const sub =
        document.querySelector(
          ".vehicle-sub"
        );

      const plate =
        document.querySelector(
          ".plate"
        );

      const owner =
        document.querySelector(
          ".owner"
        );

      if (name)
        name.textContent =
          data.brand +
          " " +
          data.model;

      if (sub)
        sub.textContent =
          data.year +
          " • Dijital Araç Profili";

      if (plate)
        plate.textContent =
          data.plate || "";

      if (owner)
        owner.textContent =
          data.owner || "";

      document.title =
        data.brand +
        " " +
        data.model +
        " • NFCAR";

      alert(
        "🔥 SUPABASE BAĞLANTISI ÇALIŞIYOR!\n\n" +
        data.brand +
        " " +
        data.model +
        "\n" +
        data.owner
      );

    } catch (error) {

      alert(
        "JAVASCRIPT HATASI:\n\n" +
        error.message
      );

    }

  };

  script.onerror = function () {

    alert(
      "Supabase JavaScript kütüphanesi yüklenemedi."
    );

  };

  document.head.appendChild(script);

})();