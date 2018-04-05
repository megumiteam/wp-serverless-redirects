

const fs = require("fs");

let src = fs.readFileSync("redirects.json");
let redirectsArray = JSON.parse(src);

var xmlbuilder = require("xmlbuilder");

var xml = function (redirectsArray) {

  var root = xmlbuilder.create("RoutingRules", {
    headless: true
  });

  for (var i = 0; i < redirectsArray.redirects.length; i++) {
    root
      .ele("RoutingRule")
      .ele("Condition")
      .ele("KeyPrefixEquals")
      .txt(redirectsArray.redirects[i].url)
      .up()
      .up()
      .ele("Redirect")
      .ele("HostName")
      .txt(redirectsArray.redirects[i].action_data.url);
  }

  return root.root().end({
    pretty: true
  });

};

var result = xml(redirectsArray);

console.log(result);