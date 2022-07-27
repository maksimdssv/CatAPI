const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const app = express();
const fileupload = require('express-fileupload');

app.use(fileupload(undefined));
const fs = require("fs");

const API_KEY = "a4160c1d-0a0f-419d-b350-9afbce0bdbb0";
const subId = "maksimd123123";
const baseUrl = 'https://api.thecatapi.com/v1/';

let baseHeaders = {
    "x-api-key": API_KEY,
    "Content-Type": 'application/json'
}


let logs = [];
let currentImage = {};
let lastFavourite = [];
let breeds = [];
let currentBreed = {};

getImage();
getBreeds();

async function getImage() {
    const res = await axios.get("https://api.thecatapi.com/v1/images/search");
    currentImage = res.data[0];
}

function getBreeds() {
    let result = null;
    axios.get(baseUrl + "breeds").then((res) => {
        result = res.data;
    }).then(() => {
        result.forEach((breed) => {
            breeds.push({name: breed.name, img: breed.image, id: breed.id});
        });
    }).catch((err) => {
        console.log(err);
    })
}

app.get("/image", (req, res) => {
    res.json(currentImage);
})

app.post('/image/:action/:id', (req, response) => {
    const action = req.params.action;
    const imgId = req.params.id;

    let data, headers = {};

    let userLog = {time: new Date().getHours() + ":" + new Date().getMinutes(), imageId: imgId}

    switch (action) {
        case "dislike":
            data = {
                "image_id": imgId,
                // "sub_id": "maksimd123123",
                "value": 0
            };
            headers = {
                ...baseHeaders
            };
            axios.post(baseUrl + "votes", data, {headers}).then(() => {
                getImage().then(() => {
                    logs.push({...userLog, action: "added to Dislikes", emojiName: "dislike"})
                    response.json({code: 200})
                });
            }).catch(err => {
                console.log(err);
            });
            break;
        case "like":
            data = {
                "image_id": imgId,
                // "sub_id": "maksimd123123",
                "value": 1
            };
            headers = {
                ...baseHeaders
            };
            axios.post(baseUrl + "votes", data, {headers}).then(() => {
                getImage().then(() => {
                    logs.push({...userLog, action: "added to Likes", emojiName: "like"})
                    response.json({code: 200})
                });
            }).catch(err => {
                console.log(err);
            });
            break;
        case "favourite":
            data = {
                "image_id": imgId,
                // "sub_id": "maksimd123123",
            };
            headers = {
                ...baseHeaders
            };
            axios.post(baseUrl + "favourites", data, {headers}).then(res => {
                logs.push({...userLog, action: "added to Favourites", emojiName: "favorite"})
                lastFavourite.push(res.data.id);
                response.json({code: 200})
            }).catch(err => {
                console.log(err);
            });
            break;
        case "favourite-del":
            headers = {
                ...baseHeaders
            };
            axios.get(baseUrl + "favourites?" + subId, {headers}).then(res => {
                return new Promise((resolve) => {
                    resolve(res.data.filter((item) => item.image_id === imgId)[0].id);
                })
            }).then((id) => {
                axios.delete(baseUrl + "favourites/" + id, {headers}).then(() => {
                    logs.push({...userLog, action: "removed from Favourites"})
                    lastFavourite.pop();
                    response.json({code: 200})
                }).catch(err => {
                    console.log(err);
                });
            })
            break;
    }

})

app.get('/logs', (req, res) => {
    res.send(logs.slice((logs.length >= 4 ? logs.length - 4 : 0), logs.length));
})

app.get('/breeds', (req, res) => {
    res.send(breeds);
})

app.get('/breed/:id', (req, res) => {
    const breedId = req.params.id;
    axios.get(baseUrl + "breeds/" + breedId).then(res => {
        currentBreed = res.data
    });
    res.sendStatus(200);
})

app.get('/currentBreed', (req, res) => {
    let data = {};
    console.log("Connection on breed");
    axios.get(baseUrl + "images/search?" + "api_key=" + API_KEY + "&breed_ids=" + currentBreed.id + "&limit=5").then(res => {
        data.images = res.data;
        data.breed = currentBreed;
    }).catch(err => {
        console.log(err);
    }).then(() => {
        res.send(data);
    });
})

app.get("/images/:breed/:type/:limit/:order", (req, res) => {
    const breedId = req.params.breed;
    const type = req.params.type;
    const limit = req.params.limit;
    const order = req.params.order;

    axios.get(baseUrl + "images/search?" + "api_key=" + API_KEY + "&breeds_ids=" + (breedId === "null" ? "" : breedId) + "&limit=" + limit + "&mime_types=" + type + "&order=" + order).then(result => {
        res.send(result.data)
    })
})

app.get('/likes', (req, res) => {
    let headers = {...baseHeaders};
    axios.get(baseUrl + "votes?" + subId, {headers}).catch(err => {
        console.log(err)
    }).then((result) => res.send((result.data.filter((item) => {
        if (item.value > 0) {
            return true
        }
    }))));
});


app.get('/dislikes', (req, res) => {
    let headers = {...baseHeaders};
    axios.get(baseUrl + "votes?" + subId, {headers}).catch(err => {
        console.log(err)
    }).then((result) => res.send((result.data.filter((item) => {
        if (item.value === 0) {
            return true
        }
    }))));
});

app.get('/favourites', (req, res) => {
    let headers = {...baseHeaders};
    axios.get(baseUrl + "favourites", {headers}).then(data => {
        res.send(data.data)
    }).catch(err => console.log(err.response.data.message));
});

app.post("/upload", (req, res) => {
    fs.writeFile("image.jpeg", req.files.img.data, (error) => {
            if (error) {
                throw error;
            }
        }
    );
    const headers = {"x-api-key": API_KEY};
    const newFormData = new FormData();
    const wait = new Promise((resolve) => {
        fs.readFile("./image.jpeg", () => {
            newFormData.append("file", fs.createReadStream("./image.jpeg"));
            resolve();
        })
    });
    wait.then(() => {
        axios.request({
            url: baseUrl + "images/upload",
            method: 'POST',
            headers: {...headers},
            data: newFormData
        }).then((result) => {
            const {data, status} = result;
            res.json({data: data, status: status});
        })
            .catch(() => {
                res.json({status: 400});
            });
    });
})

app.listen(6000, () => {
    console.log('listening on port 6000');
});