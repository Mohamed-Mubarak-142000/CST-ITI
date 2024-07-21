window.addEventListener("DOMContentLoaded", function () {
  const complainsHolder = document.getElementById("complains-holder");
  let emails = JSON.parse(localStorage.getItem("Emails")) || [];
  if (emails) {
    renderEmails(emails)
  } else complainsHolder.innerHTML = `<h4 class="text-center">No Emails </h4>`




  function renderEmails(emails) {
    for (let i = 0; i < emails.length; i++) {
      let details = document.createElement('details')
      details.id = "complains-holder"
      details.classList = "row rounded-3 w-100 overflow-hidden justify-content-center align-items-start py-2"
      let summary = document.createElement("summary")
      summary.classList = "col-12 col-md-4 me-auto d-felx w-100 p-3"
      summary.innerHTML = `
            <table class="w-100">
              <tr>
                <td>${emails[i].fullName}</td>
                <td>${emails[i].email}</td>
                <td>${emails[i].phone}</td>
              </tr>
            </table>           
              `

      let complainDetails = document.createElement("p")
      let hr = document.createElement("hr")
      complainDetails.innerText = emails[i].message
      details.appendChild(summary)
      details.appendChild(complainDetails)
      // details.appendChild(hr)
      complainsHolder.appendChild(details)
      complainsHolder.appendChild(hr)
    }
  }



})
