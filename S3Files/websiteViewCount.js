function updateCounter() {
    fetch("https://u2l16jlkki.execute-api.us-east-2.amazonaws.com/prod/CloudResumeChallenge", {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("something went wrong");
        }
      })
      .then(
        (data) =>
          (document.getElementById("view-count").innerText = data)
      );
  }