let express = require( "express" )
let app = express()
let pg = require( "pg" )
let format = require( "pg-format" )
let PGUSER = "ruslansuvorov"
let PGDATABASE = "example"
let age = 732

let config = {
    user: PGUSER,
    database: PGDATABASE,
    max: 10,
    idleTimeoutMillis: 30000
}

let pool = new pg.Pool( config )
let myClient

pool.connect( function( err, client, done ){
    if( err ) console.log( err )
    app.listen( 3000, function(){
        console.log( "listening on 3000" )
    })
    myClient = client
    let ageQuery = format( "SELECT * from numbers WHERE age = %L", age )
    myClient.query( ageQuery, function( err, result ){
        if( err ){
            console.log( err )
        }
        console.log( result["rows"][0] )
    })
})