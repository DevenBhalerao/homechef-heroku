console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  let text="Incoming Order Notification!"

  self.registration.showNotification(data.title, {
    body: "Incoming Order Notification!",
    icon: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fsm.pcmag.com%2Ft%2Fpcmag_in%2Freview%2Fh%2Fhome-chef-%2Fhome-chef-meal-delivery-service_xyan.620.jpg&imgrefurl=https%3A%2F%2Fin.pcmag.com%2Fmeal-kits%2F107900%2Fhome-chef-meal-delivery-service&tbnid=8aPkN2LnXcErsM&vet=12ahUKEwjrspDC4uPpAhUOBrcAHWY2CGgQMygFegUIARCNAg..i&docid=Ng9tJ-4kQzX3OM&w=620&h=349&q=homechef&ved=2ahUKEwjrspDC4uPpAhUOBrcAHWY2CGgQMygFegUIARCNAg"
  });
});