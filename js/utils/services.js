const basedUrl = `https://brick-game-285ba-default-rtdb.europe-west1.firebasedatabase.app/topPlayers.json`

const getData = async () => {
  try {
    const res = await fetch(basedUrl);
    return await res.json();
  } catch (error) {
    console.log(error)
    return {};
  }
}

const getListBestPlayers = async () => {
  const data = await getData();
  const arrPlayers = Object.values(await data)
    .sort((a, b) => b.score - a.score)
    .filter((el, i) => i < 49)
  return arrPlayers;
}

const postScore = async (data) => {
  //url
  try {
    const response = await fetch(basedUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      referrerPolicy: "unsafe-url",
      body: JSON.stringify(data)
    })
    
    return await response.json();
  } catch (error) {
    console.log(error)
  }
}

export {getListBestPlayers, postScore};