const settings = {
  async: true,
  crossDomain: true,
  url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
  method: "POST",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "x-rapidapi-host": "google-translate1.p.rapidapi.com",
  },
  data: {
    q: "Hello, world!",
    target: "de",
    source: "en",
  },
};

$(function () {
  chrome.tabs.executeScript(
    null,
    {
      code: "window.getSelection().toString();",
    },
    function (selection) {
      if (selection) {
        document.getElementById("english_word").value = selection[0];
      }
    }
  );

  $("#translate").click(function () {
    let eng_text = document.getElementById("english_word").value;
    if (eng_text.trim() === "") return;
    if (eng_text.split(" ").length > 1) {
      $("#alert").text("Multiple words or sentences not supported");
      return;
    }
    settings.data.q = eng_text.trim();
    chrome.storage.sync.get("key", function (rapidApi) {
      if (!rapidApi.key) {
        $("#alert").text("API key not present. Add it in options page");
        return;
      } else {
        $("#alert").text("");
      }
      settings.headers = {
        ...settings.headers,
        "x-rapidapi-key": rapidApi.key,
      };
      document.getElementById("german_text").value = "fetching...";
      $.ajax(settings).done(function (response) {
        document.getElementById("german_text").value =
          response.data.translations[0].translatedText;
      });
    });
  });
});
