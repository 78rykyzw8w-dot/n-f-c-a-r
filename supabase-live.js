(function () {
  const SUPABASE_URL =
    "https://vxzqicqytfwarvnjtae.supabase.co";

  const SUPABASE_KEY =
    "sb_publishable_nYtSXjPDIYiMWDIieLnC_g_r9LEqOqf";

  const script = document.createElement("script");

  script.src =
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

  script.onload = async function () {

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

    const { data, error } =
      await supabase
        .from("vehicles")
        .select("*")
        .eq("id", nfcId)
        .eq("active", true)
        .maybeSingle();

    if (error) {
      console.error(
        "NFCAR Supabase:",
        error
      );
      return;
    }

    if (!data) {
      const name =
        document.querySelector(
          ".vehicle-name"
        );

      const sub =
        document.querySelector(
          ".vehicle-sub"
        );

      if (name)
        name.textContent =
          "Araç bulunamadı";

      if (sub)
        sub.textContent =
          "Geçersiz veya pasif NFCAR ID";

      return;
    }

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
  };

  document.head.appendChild(script);
})();
