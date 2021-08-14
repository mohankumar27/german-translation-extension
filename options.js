$(function () {
  $("#save").click(function () {
    let key = $("#key").val();
    if (key) {
      chrome.storage.sync.set({ key: key }, function () {
        close();
      });
    }
  });
});
