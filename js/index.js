const main = async() => {
    const league = await  document.querySelector(".leagues");
    const btn1 = await document.querySelector(".btn1");
    const matchBoard = document.querySelector(".matchLists");
    const videoSection = document.querySelector(".vidArea");
  let matchDate;
    let selectedMatch;

    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" }
      return new Date(dateString).toLocaleDateString(undefined, options)
    }


    const getLeague = async(league) => {
    // console.log("Ran")
    const req = await fetch('https://www.scorebat.com/video-api/v3/');
    const res = await req.json();
    const data = await res.response
    const leaguePicked = await data.filter(one => one.competition === league)
    const final = leaguePicked.map((one ) => {
      matchDate = formatDate(one.date)

      let wrapper = document.createElement("section")
      wrapper.id = one.title;
      let thumbNail = document.createElement('div');
        thumbNail.className = "thumbNailDiv"
      let ImgThumb = document.createElement("img");
    ImgThumb.setAttribute('src',  one.thumbnail);
    ImgThumb.setAttribute('alt', one.title);
    ImgThumb.setAttribute('height', '100%');
    ImgThumb.setAttribute('width', '100%');
    thumbNail.appendChild(ImgThumb);
      let board =  document.createElement('div')
      board.className = "board"
      let date = document.createElement("p");
      date.className = "date";
      let dateNode = document.createTextNode(matchDate)
      date.appendChild(dateNode);
      let textnode = document.createTextNode(one.title)
      board.appendChild(textnode)
      board.appendChild(date)
      wrapper.appendChild(thumbNail)
      wrapper.appendChild(board)
      matchBoard.appendChild(wrapper);
    })
    console.log("Finished")
    return final;
} 

const getOneGame = async(id) => {
    const req = await fetch('https://www.scorebat.com/video-api/v3/');
    const res = await req.json();
    const data = await res.response
    const matchPicked = data.filter((one) => one.title == id)
    let video = await matchPicked[0].videos[0].embed
    video ? videoSection.innerHTML = video : null
}

    btn1.addEventListener('click', async function(){
      try {
        matchBoard.innerHTML="";
        getLeague(league.value)
      } catch (error) {
        matchBoard.innerHTML="Sorry, Videos are currently updated."
      }
    });
  matchBoard.addEventListener('click', async(e) => {
    selectedMatch = await e.path[1].id
    console.log(selectedMatch)
    await getOneGame(selectedMatch)

  })

}
main();

