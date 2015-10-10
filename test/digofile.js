var digo = require("digo");

exports.default = function () {
	digo.src("fixtures/*.js", "fixtures/*.jsx").pipe("../").dest("_build");
};
