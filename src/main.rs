#![allow(unused_imports)]
#![allow(unused_variables)]
#[macro_use] extern crate nickel;
extern crate hyper;

use nickel::{ Nickel, NickelError, Continue, Halt, Request, Response, MediaType,
    QueryString, JsonBody, StaticFilesHandler, MiddlewareResult, HttpRouter, Action};
use nickel::status::StatusCode;
use hyper::header::Location;
use std::collections::HashMap;

//this is an example middleware function that just logs each request
fn logger<'a>(request: &mut Request, response: Response<'a>) -> MiddlewareResult<'a> {
    println!("logging request: {:?}", request.origin.uri);
    Ok(Continue(response))
}

fn main() {
    let mut server = Nickel::new();
    //let router = Nickel::router();

    server.utilize(logger);
    server.utilize(StaticFilesHandler::new("src/static"));

    server.utilize(router!(
        get "/" => |req, res| {
            let mut data = HashMap::<&str, &str>::new();
            data.insert("name", "Rustaceans");
            return res.render("src/templates/simplemain.tpl", &data);
        }
    ));

      /*server.get("/", middleware! { |_, res|
         let mut data = HashMap::<&str, &str>::new();
         data.insert("name", "Rustaceans");
         return res.render("src/templates/hello.tpl", &data)
      });*/

       /*server.get("/",middleware! { |_, mut res|
            res.set(StatusCode::PermanentRedirect)
            //update header
            .set(Location("http://nickel.rs".into()));
            ""
        });*/

    server.listen("127.0.0.1:3000");

}
