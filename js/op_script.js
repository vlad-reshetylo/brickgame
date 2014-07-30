function checkDif() {
    switch (localStorage["difficult"]) {
        case "1.1":
            $("#diff-now").html('<span style = "color:#2AEA4D">Boring</span>');
            break;
        case "2.1":
            $("#diff-now").html('<span style = "color:#344BDF">Normal</span>');
            break;
        case "3.1":
            $("#diff-now").html('<span style = "color:#F08D00">Hard</span>');
            break;
        case "5":
            $("#diff-now").html('<span style = "color:#F00005">EXTREMELLY!!</span>');
            break
    }
}

function checkStyle() {
    switch (localStorage["style"]) {
        case "base":
            $("#style-now").html("Retro");
            break;
        case "energy":
            $("#style-now").html("Energy");
            break;
        case "matrix":
            $("#style-now").html("Matrix");
            break;
        case "gloominess":
            $("#style-now").html("Gloominess");
            break;
        case "primitive":
            $("#style-now").html("Primitive");
            break
    }
}
$(document).ready(function() {
    if (location.search != "") {
        $(".back-button").show()
    }
    if (localStorage["difficult"] === undefined) {
        localStorage["difficult"] = 2.1
    }
    if (localStorage["style"] === undefined) {
        localStorage["style"] = "base"
    }
    checkDif();
    checkStyle();
    $("#did1").click(function() {
        localStorage["difficult"] = 1.1;
        checkDif()
    });
    $("#did2").click(function() {
        localStorage["difficult"] = 2.1;
        checkDif()
    });
    $("#did3").click(function() {
        localStorage["difficult"] = 3.1;
        checkDif()
    });
    $("#did4").click(function() {
        localStorage["difficult"] = 5;
        checkDif()
    });
    $("#sid1").click(function() {
        localStorage["style"] = "base";
        checkStyle()
    });
    $("#sid2").click(function() {
        localStorage["style"] = "energy";
        checkStyle()
    });
    $("#sid3").click(function() {
        localStorage["style"] = "matrix";
        checkStyle()
    });
    $("#sid4").click(function() {
        localStorage["style"] = "gloominess";
        checkStyle()
    });
    $("#sid5").click(function() {
        localStorage["style"] = "primitive";
        checkStyle()
    })
})