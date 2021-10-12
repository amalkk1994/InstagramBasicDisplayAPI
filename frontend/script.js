//import fetch from "node-fetch";

console.log('Script Running....');


const myUserToken = 'yourUserToken'
let fetchRes = fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${myUserToken}`);

fetchRes.then(
    res => res.json()).then(
        d => {
            console.log(d);
        }
    )

console.log('calling function')

async function loadMedias() {
    const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption&access_token=${myUserToken}`);
    const medias = await response.json();
    return medias;
  }
  
  let mediaObject = await loadMedias();

  console.log(mediaObject.data[0].caption);

  async function loadMediaContent(mediaID) {
    const response = await fetch(`https://graph.instagram.com/${mediaID.id}?fields=id,media_type,media_url,username,timestamp,thumbnail_url,caption&access_token=${myUserToken}`);
    const mediaContent = await response.json();
    return mediaContent;
  } 

  async function loadAllMediaContent() {
    const response = await fetch(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,timestamp,thumbnail_url,caption&access_token=${myUserToken}`);
    const mediaContent = await response.json();
    return mediaContent;
  } 


  let allMedias = await loadAllMediaContent();

  console.log(allMedias);

    allMedias.data.forEach((mediaItem) => {

      console.log(mediaItem.thumbnail_url);
    
      let containerElement = document.getElementById("container");
      let mediaCaption = mediaItem.caption;

      if (!mediaCaption){
        mediaCaption = "No Title"
      }
      
      let headerElement = document.createElement("H1");
      let headerText = document.createTextNode(mediaCaption);
      headerElement.appendChild(headerText);
      containerElement.appendChild(headerElement);
      containerElement.appendChild(document.createElement('img')).src = `${mediaItem.thumbnail_url}`;
      
    });

  /*
  mediaObject.data.forEach(async (dataItems) => {

    console.log(dataItems);

    let mediaContent = await loadMediaContent(dataItems);

    console.log(mediaContent);
    console.log(mediaContent.thumbnail_url);
  
    let containerElement = document.getElementById("container");
  
    let headerElement = document.createElement("H1");
    let headerText = document.createTextNode(mediaContent.caption);
    headerElement.appendChild(headerText);
    containerElement.appendChild(headerElement);
    containerElement.appendChild(document.createElement('img')).src = `${mediaContent.thumbnail_url}`;

  });
  */

  /*

  let mediaContent = await loadMediaContent(mediaObject.data[0].id);

  console.log(mediaContent);
  console.log(mediaContent.thumbnail_url);

  let containerElement = document.getElementById("container");

  let headerElement = document.createElement("H1");
  let headerText = document.createTextNode(mediaContent.caption);
  headerElement.appendChild(headerText);
  containerElement.appendChild(headerElement);
  containerElement.appendChild(document.createElement('img')).src = `${mediaContent.thumbnail_url}`;

*/

console.log('call ends')
