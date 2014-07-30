var _check = {
    directionAvailable: function(e) {
        var t = false;
        switch (e) {
            case "up":
                if (_do.getDirection() != 3 && _do.getDirection() != 1) {
                    t = true
                }
                break;
            case "right":
                if (_do.getDirection() != 4 && _do.getDirection() != 2) {
                    t = true
                }
                break;
            case "down":
                if (_do.getDirection() != 1 && _do.getDirection() != 3) {
                    t = true
                }
                break;
            case "left":
                if (_do.getDirection() != 2 && _do.getDirection() != 4) {
                    t = true
                }
                break
        }
        if (!window.snake.dirChangeAllow) {
            t = false
        }
        return t
    },
    gameOver: function() {
        var e = window.snake.position[0].x;
        var t = window.snake.position[0].y;
        for (var n = 1; n < window.snake.length; n++) {
            if (e == window.snake.position[n].x && t == window.snake.position[n].y) {
                _core.stopGame();
                return true
            }
            if (e > 180) {
                _core.stopGame();
                return true
            }
            if (e < 0) {
                _core.stopGame();
                return true
            }
            if (t > 380) {
                _core.stopGame();
                return true
            }
            if (t < 0) {
                _core.stopGame();
                return true
            }
        }
        return false
    },
    meal: function() {
        if (window.meal.position.x == window.snake.position[0].x && window.meal.position.y == window.snake.position[0].y) {
            console.log("Mmm, delicious! :)");
            window.score += 10 * window.snake.speed * localStorage["difficult"];
            _do.updateScore();
            if (window.score > localStorage["HighScore"]) {
                localStorage["HighScore"] = window.score;
                _do.updateHighScore()
            }
            $("#pm").remove();
            _do.addMeal();
            window.snake.growUp = true;
            if (window.score > window.snake.speed * 60 * window.snake.speed * localStorage["difficult"] && window.snake.speed < 10) {
                window.snake.speed++;
                _core.stopGame();
                _core.play();
                _do.updateSpeed();
                console.log("Speed up!")
            }
        } else {
            return false
        }
    }
};



var _do = {
    setY: function(pixelId, shift) {
        $("#p" + pixelId).css("top", shift + "px")
    },
    setX: function(pixelId, shift) {
        $("#p" + pixelId).css("left", shift + "px")
    },
    addPixel: function(e, t) {
        var pixel = new Object;
        var id = window.snake.length;
        var div = '<div class = "pix" id = "p' + id + '"></div>';
        pixel.x = e;
        pixel.y = t;
        window.snake.position.push(pixel);
        $(".screen-container").append(div);
        _do.setX(id, window.snake.position[id].x);
        _do.setY(id, window.snake.position[id].y);
        window.snake.length++
    },
    addMeal: function() {
        var e = _core.getRandomCoord();
        var t = '<div class = "pix" id = "pm"></div>';
        window.meal = new Object;
        window.meal.position = e;
        $(".screen-container").append(t);
        $("#pm").css("top", e.y);
        $("#pm").css("left", e.x);
        console.log("New meal, yummy :3")
    },
    setDirection: function(e) {
        switch (e) {
            case "up":
                var t = 1;
                break;
            case "right":
                var t = 2;
                break;
            case "down":
                var t = 3;
                break;
            case "left":
                var t = 4;
                break;
            default:
                console.log("WRONG DIRECTION!")
        }
        if (_check.directionAvailable(e)) {
            window.snake.direction = t;
            window.snake.dirChangeAllow = false
        } else {
            console.log("What? O_o I will not do it.")
        }
    },
    getDirection: function() {
        return window.snake.direction
    },
    move: function() {
        var e = new Object;
        e = window.snake.position[window.snake.length - 1];
        for (var t = window.snake.length - 1; t >= 1; t--) {
            window.snake.position[t].x = window.snake.position[t - 1].x;
            window.snake.position[t].y = window.snake.position[t - 1].y
        }
        switch (window.snake.direction) {
            case 1:
                window.snake.position[0].y = window.snake.position[0].y - 20;
                break;
            case 2:
                window.snake.position[0].x = window.snake.position[0].x + 20;
                break;
            case 3:
                window.snake.position[0].y = window.snake.position[0].y + 20;
                break;
            case 4:
                window.snake.position[0].x = window.snake.position[0].x - 20;
                break
        }
        _check.meal();
        if (window.snake.growUp) {
            _do.addPixel(e.x, e.y);
            window.snake.growUp = false
        }
        if (!_check.gameOver()) {
            for (var t = 0; t < window.snake.length; t++) {
                _do.setX(t, window.snake.position[t].x);
                _do.setY(t, window.snake.position[t].y)
            }
        } else {
            _core.gameOver()
        }
        window.snake.dirChangeAllow = true
    },
    updateSpeed: function() {
        $("#speed").html("Speed <br>" + window.snake.speed)
    },
    updateScore: function() {
        $("#score").html("Score <br>" + Math.floor(window.score))
    },
    updateHighScore: function() {
        $("#hi-score").html("HighScore <br>" + Math.floor(localStorage["HighScore"]))
    }
};


var _core = {
    init: function() {
        if (localStorage["HighScore"] === undefined) {
            localStorage["HighScore"] = 0
        }
        if (localStorage["difficult"] === undefined) {
            localStorage["difficult"] = "2.1"
        }
        if (localStorage["style"] === undefined) {
            localStorage["style"] = "base"
        }
        var e = localStorage["style"];
        styles = ".screen-container{background-image: url('img/" + e + "/dis.png');}";
        styles += ".score-place{background-image: url('img/" + e + "/bg.png')}";
        styles += ".pix{background-image: url('img/" + e + "/ena.png');}";
        $("#style").remove();
        $("head").append('<style id="style">' + styles + "</style>");

        window.addEventListener("keydown", _keyHandler.listen, false);
        window.addEventListener("keypress", _keyHandler.listen, false);
        window.snake = new Object;
        window.snake.position = new Array;
        window.snake.length = 0;
        window.snake.dirChangeAllow = true;
        window.score = 0;
        window.snake.speed = 1;
        window.snake.growUp = false;


        _do.addPixel(180, 320);
        _do.addPixel(180, 340);
        _do.addPixel(180, 360);
        _do.addPixel(180, 380);

        _do.updateScore();
        _do.updateHighScore();
        _do.updateSpeed();

        _do.setDirection("up");

        console.log("Game started!");

        _do.addMeal();
        _core.play()

    },
    play: function() {
        var e = Math.floor(1e3 / (window.snake.speed * localStorage["difficult"]));
        window.snake.playID = setInterval(_do.move, e)
    },
    stopGame: function() {
        clearInterval(window.snake.playID)
    },
    gameOver: function() {
        var e = setInterval(function() {
            $(".pix").toggle()
        }, 200);
        setTimeout(function() {
            clearInterval(e);
            $(".screen-container").html("");
            delete window.snake;
            delete window.score;
            delete window.meal;
            $(".pix").show();
            _core.init()
        }, 2e3);
        console.log("Game over :(")
    },
    getRandomCoord: function() {
        var e = false;
        while (!e) {
            e = true;
            var t = Math.floor(Math.random() * 10) * 20;
            var n = Math.floor(Math.random() * 20) * 20;
            for (var r = 0; r < window.snake.length; r++) {
                if (t == window.snake.position[r].x && n == window.snake.position[r].y) {
                    e = false;
                    break
                }
            }
        }
        var i = new Object;
        i.x = t;
        i.y = n;
        return i
    }
};
var _keyHandler = {
    listen: function(e) {
        switch (e.keyCode) {
            case 37:
                _do.setDirection("left");
                break;
            case 38:
                _do.setDirection("up");
                break;
            case 39:
                _do.setDirection("right");
                break;
            case 40:
                _do.setDirection("down");
                break;
            case 65:
                _do.setDirection("left");
                break;
            case 87:
                _do.setDirection("up");
                break;
            case 68:
                _do.setDirection("right");
                break;
            case 83:
                _do.setDirection("down");
                break
        }
    }
};
$(document).ready(function() {
    _core.init();
    $('#about').click(function() {
        $('.about').toggle('slow');
    });
    $('#author').click(function() {
        if ($('#author').html() == 'Vlad Reshet') {
            $('#author').html('vk.com/vladreshet');
        } else {
            $('#author').html('Vlad Reshet');
        }
    });
})