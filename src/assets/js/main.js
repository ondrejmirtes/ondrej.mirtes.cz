// Archive year jumper: navigate when the <select> changes.
const archiveForm = document.querySelector("#frm-archiveForm");
if (archiveForm) {
  archiveForm.addEventListener("change", (event) => {
    const url = event.target.value;
    if (url) {
      document.location = url;
    }
  });
}
