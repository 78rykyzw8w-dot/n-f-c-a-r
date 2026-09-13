(function () {

  const SUPABASE_URL =
    "https://vxzqicqytfwarvnjtae.supabase.co";

  const SUPABASE_KEY =
    "sb_publishable_nYtSXjPDIYiMWDIieLnC_g_r9LEqOqf";

  const params =
    new URLSearchParams(window.location.search);

  const nfcId =
    params.get("id");

  // TEST: Bu kutu görünüyorsa script kesin çalışıyor
  const debug = document.createElement("div");

  debug.style.cssText = `
    position: fixed;
    top: 10px;
    left: 10px;
    right: 10px;
    z-index: 99999;
    background: #111;
    color: #00ff88;
    padding: 14px;
    border-radius: 10px;
    font-family: Arial;
    font-size: 14px;
  `;

  debug.textContent =
    "NFCAR bağlantısı başlatılıyor... ID: " +
    nfcId;

  document.body.appendChild(debug);


  if (!nfcId) {

    debug.textContent =
      "NFCAR HATASI: ID bulunamadı.";

    return;
  }


  const apiUrl =
    SUPABASE_URL +
    "/rest/v1/vehicles" +
    "?id=eq." +
    encodeURIComponent(nfcId) +
    "&active=eq.true" +
    "&select=*";


  fetch(apiUrl, {

    method: "GET",

    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization":
        "Bearer " + SUPABASE_KEY
    }

  })

  .then(async function (response) {

    const text =
      await response.text();

    if (!response.ok) {

      throw new Error(
        "HTTP " +
        response.status +
        ": " +
        text
      );

    }

    return JSON.parse(text);

  })

  .then(function (rows) {

    console.log(
      "NFCAR SUPABASE:",
      rows
    );


    if (!rows || rows.length === 0) {

      debug.textContent =
        "SUPABASE BAĞLANDI AMA ARAÇ BULUNAMADI. ID: " +
        nfcId;

      return;
    }


    const data =
      rows[0];


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


    debug.textContent =
      "🔥 SUPABASE ÇALIŞIYOR → " +
      data.brand +
      " " +
      data.model +
      " → " +
      data.owner;

  })

  .catch(function (error) {

    console.error(
      "NFCAR SUPABASE HATASI:",
      error
    );

    debug.textContent =
      "❌ SUPABASE HATASI: " +
      error.message;

  });

})();