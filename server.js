var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('cards.cdb')


var cards = [59438930, 99590524]
async function grabCards() {
    return new Promise((resolve, reject) => {
        var cardlist = []
        db.each(`SELECT id, ot, alias, setcode, type, def, race, attribute, category, name , desc FROM datas natural join texts WHERE id IN (${cards.join(',')})`, (err, row) => {
            if (err) {
                throw new Error(err)
            } else {
                cardlist.push(row)
            }
        }, (err, n) => {
            if (err) {
                reject(err)
            } else {
                resolve(cardlist)
            }
        })
    })
}

grabCards().then((res) => {
    console.log(res)
}).catch(err => {
    console.log(err)
})

/* db.serialize(() => {
    db.each("SELECT id, ot, alias, setcode, type, def, race, attribute, category, name , desc FROM datas natural join texts WHERE name LIKE 'System Down'", (err,row) => {
        if(err) {
            console.log(err)
        }
        console.log(row)
    })
/*     db.each("SELECT id, ot, alias, setcode, type, def, race, attribute, category, name , desc FROM datas natural join texts", (err, row) => {
        if (err) {
            error.log(err)
        }
        console.log(row)
    }) 
}) */
