const form = document.getElementById('songinputform');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload

    const data = {
        data: [{
            song: form.song.value || "Unknown Song",
            artist: form.artist.value || "Unknown Artist",
            username: form.username.value || "Anonymous"
        }]
    };

    fetch("https://sheetdb.io/api/v1/afsziygvhh0m1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
        alert("Song submitted successfully! Thank you :)");
        form.reset(); // clear the form fields
    })
    .catch(err => {
        console.error(err);
        alert("There was an error submitting your song. Please try again. :(");
    });
});