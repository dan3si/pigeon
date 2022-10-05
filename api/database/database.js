const fs = require('fs')

class Database {
    generateRouteId() {
        let result = ''

        for (let i = 0; i < 8; i++) {
            result += String.fromCharCode(97 + Math.floor(Math.random() * 26))
        }

        return result
    }

    getRoutes() {
        const routes = fs.readFileSync(__dirname + '/routes.json')
        return JSON.parse(routes)
    }

    addRoute({ id, from, to, date, name, phone }) {
        const routes = this.getRoutes()
        routes.push({ id, from, to, date, name, phone })

        fs.writeFileSync(
            __dirname + '/routes.json',
            JSON.stringify(routes, null, '\t')
        )
    }
}

module.exports = new Database()
