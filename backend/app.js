const activities = require('./activities.json');
const provinces = require('./provinces.json');
const categories = require('./categories.json');
const express = require('express');
const cors = require('cors');
const app = express();


app.use(express.static(__dirname + '/public'));
app.use(cors());



app.listen(3001, () => { })


app.get(['/', '/activities'], (req, res) => {

    res.json(activities);
})
app.get('/activities/:id', (req, res) => {
    const answer = activities.filter((el) => {
        return parseInt(req.params.id) == el.activityID;
    })
    res.json(answer);
})
app.get('/activities/limit/:val', (req, res) => {
    const answer = [];
    if (activities.length >= req.params.val) {
        for (var x = 0; x < req.params.val; x++) {

            answer.push(activities[x]);
        }
    } else {
        answer.push(...activities);
    }

    res.json(answer);
})

app.get('/activities/limit/:limit/:page', (req, res) => {
    const answer = [];
    if (activities.length >= req.params.limit) {

        if (req.params.page && ((activities.length / req.params.limit) >= req.params.page)) {
            var start = (req.params.limit * (req.params.page - 1));
            var end = (req.params.limit * req.params.page) - 1;
            for (var x = start; x <= end; x++) {

                answer.push(activities[x]);
            }

        } else {
            for (var x = 0; x < req.params.limit; x++) {
                answer.push(activities[x]);
            }
        }

    } else {
        answer.push(...activities);
    }

    res.json(answer);
})

app.get('/provinces', (req, res) => {

    res.json(provinces);
})
app.get('/categories', (req, res) => {
    res.json(categories);
})

app.get('/filterByVal/:val', (req, res) => {

    var val = req.params.val.toUpperCase().toString();
    var filteredActivities = [];
    activities.filter((act) => {
        var title = act.title.toUpperCase();
        var sponsors = act.activitySponsors.toString().toUpperCase();
        var activity = act.activityCategory.toString().toUpperCase();
        var description = act.description.toString().toUpperCase();
        var provinces = [];
        var places = [];
        act.currentProvinces.forEach((e) => {
            provinces.push(Object.keys(e).toString());
            places.push(Object.values(e).toString())
        });
        var stringProvin = provinces.toString();
        var stringPlace = places.toString().toUpperCase();
        if (title.includes(val) || sponsors.includes(val) || description.includes(val) || stringProvin.includes(val) || stringPlace.includes(val) || activity.includes(val)) {
            filteredActivities.push(act);
        }
    })
    res.json(filteredActivities);

})


app.get('/filterByParam/', (req, res) => {

    //parametre atandıysa bunları aldık;
    let dateScale = req.query.dateScale != undefined ? JSON.parse(req.query.dateScale) : false;
    let provinces = req.query.provinces != undefined ? JSON.parse(req.query.provinces) : false;
    let places = req.query.place != undefined ? JSON.parse(req.query.place) : false;
    let categories = req.query.category != undefined ? JSON.parse(req.query.category) : false;

    //filtrenecek parametreler için listeler oluşturuyoruz 

    var dateScaleFiltered = [];
    var ProvincesFiltered = [];
    var PlacesFiltered = [];
    var CategoryFiltered = [];
    var finalFilterList = activities;
    //hangisinin parametresi gönderilmiş ise onu çalıştırıyoruz
    dateScale ? dateFilter() : false;
    provinces ? provincesFilter() : false;
    places ? placesFilter() : false;
    categories ? categoryFilter() : false;


    function dateFilter() {
        finalFilterList.forEach((act) => {
            act.dateScale.forEach((date) => {

                var biggerThanWant = new Date(date) - new Date(dateScale[0]);
                if (biggerThanWant >= 0) {
                    dateScaleFiltered.push(act);
                }

            })
        })
        if (dateScale[1] != null) {
            var newList = [];
            var newFiltered = Array.from(new Set(dateScaleFiltered));
            newFiltered.forEach((act) => {
                act.dateScale.forEach((date) => {
                    var litterThanWant = new Date(date) - new Date(dateScale[1])
                    if (litterThanWant <= 0) {
                        newList.push(act);
                    }


                })
            })

            finalFilterList = Array.from(new Set(newList));
            return;
        }
        finalFilterList = dateScaleFiltered;
    }
    function provincesFilter() {

        finalFilterList.forEach((act) => {
            act.currentProvinces.forEach((el) => {
                provinces.forEach((val) => {
                    if (Object.keys(el).toString() == val) {
                        ProvincesFiltered.push(act);
                    }
                })


            })
        })
        finalFilterList = ProvincesFiltered;
    }
    function placesFilter() {
        finalFilterList.forEach((act) => {
            act.currentProvinces.forEach((el) => {
                places.forEach((val) => {
                    if (Object.values(el).toString() == val) {
                        PlacesFiltered.push(act);
                    }
                })


            })
        })
        finalFilterList = PlacesFiltered;
    }
    function categoryFilter() {
        finalFilterList.forEach((act) => {
            categories.forEach((val) => {
                if (act.activityCategory == val) {
                    CategoryFiltered.push(act);
                }
            })
        })
        finalFilterList = CategoryFiltered;
    }
    res.json(finalFilterList);
})






