//INIT CHAT COLORS

let colors = ["red", "blue", "cyan", "pink", "yellow", "purple", "green"];

//INIT SOCKET
var socket = io();

//START MOMENT
moment().format();

//START EMOJI
$(function() {
  imojify("div");
});

//CLEAN INPUT
const cleanInput = input => {
  return $("<div/>")
    .text(input)
    .html();
};

//INITIATE SOCKET.IO
/* $(function () {
    socket = io();
    $('form').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });
    socket.on('chat message', function(data){
      var current_time = new moment().format("HH:mm:ss");
      //$('#messages').append($('<div>').text(`${data.nick}: ${data.msg}`).append($('<span>').text(current_time)))
      $('#messages').append($('<div class="message">').append($('<span>').text(`${data.nick}: ${data.msg}`)).append($('<span>').text(current_time)))
      imojify('div')
    });
    socket.on('card hover', function(data) {
      var current_time = new moment().format("HH:mm:ss");
      $('#messages').append($('<div>').append($('<span>').text(`${data.nick} has hovered: `)).append($('<b class="cardHover">').text(data.msg)).append($('<span>').text(current_time)))
    })
    $('#messages').on('mouseenter', 'b', function() {
      let log = true;
      let card = $(this).text()
      let url = encodeURI(`https://www.ygohub.com/api/card_info?name=${card}`).replace("&","%26");
      getCardInfo(url, card, log);
    })
  }); */

//INIT GUEST NAME

var username;

const setUsername = () => {
  username = prompt("Please enter your name", "Anonymous");
  if (username == null || username == "") {
    username == "Anonymous";
    socket.emit("add user", username);
  }
  if (username) {
    socket.emit("add user", username);
  }
};

const sendMessage = () => {
  var message = $("#m").val();
  if (message) {
    $("#m").val("");
    socket.emit("new message", message);
  }
};

const addChatMessage = data => {
  let avatar = $(
    '<img src="https://orig00.deviantart.net/b5be/f/2015/041/f/a/seto_kaiba_avatar_1_by_avatarw0rld-d8hh8dg.png" />'
  );
  avatar.addClass("avatar");
  var current_time = new moment().format("HH:mm:ss");
  let messageClass = $('<div class="message">');
  let name = $("<span>");
  name.append($("<b>").text(data.username));
  let message = $("<span>");
  message.text(data.message);
  message.addClass("messageText");
  let time = $("<span>");
  time.append($("<span>").text(current_time));
  time.addClass("timeStamp");
  let messageContainer = messageClass;
  let msg = $('<span class="msg">')
    .append(avatar)
    .append(name)
    .append(message);
  messageContainer.append(msg).append(time);
  $("#messages").append(messageContainer);
  imojify("div");
};

socket.on("new message", data => {
  addChatMessage(data);
});

$(function() {
  setUsername();
  $("form").submit(function() {
    sendMessage();
    return false;
  });
  socket.on("card hover", function(data) {
    var current_time = new moment().format("HH:mm:ss");
    $("#messages").append(
      $("<div>")
        .append($("<span>").text(`${data.username} has hovered: `))
        .append($('<b class="cardHover">').text(`${data.cardname}`))
        .append($("<span>").text(current_time))
    );
  });
  socket.on("card drop", function(data) {
    alert(data);
  });
  $("#messages").on("mouseenter", "b", function() {
    let log = true;
    let card = $(this).text();
    let url = encodeURI(
      `https://db.ygoprodeck.com/api/v2/cardinfo.php?name=${card}`
    ).replace("&", "%26");
    getCardInfo(url, card, log);
  });
});

//INITIATE MUSIC
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "block";
  this.sound.volume = 0.2;
  document.body.appendChild(this.sound);
  this.play = function() {
    this.sound.play();
  };
  this.stop = function() {
    this.sound.pause();
  };
}

/* var myMusic;
myMusic = new sound("https://my.mixtape.moe/gflkkd.mp3");
myMusic.play(); */

var cards = [
  "Monster Reborn",
  "Blue-eyes White Dragon",
  "Blue-eyes White Dragon",
  "Blue-eyes White Dragon",
  "Crush Card Virus",
  "Polymerization",
  "Saggi the Dark Clown"
];
var box = [];
var boximg = [];
var ATTRIBUTE = {
  LIGHT:
    "https://cdn.discordapp.com/attachments/257543543403315200/470315485276405760/GUI_T_Icon1_Attr01.png",
  DARK:
    "https://cdn.discordapp.com/attachments/257543543403315200/470552865459404830/GUI_T_Icon1_Attr02.png",
  WATER:
    "https://cdn.discordapp.com/attachments/257543543403315200/470315487075762186/GUI_T_Icon1_Attr03.png",
  FIRE:
    "https://cdn.discordapp.com/attachments/257543543403315200/470315488610877470/GUI_T_Icon1_Attr04.png",
  EARTH:
    "https://cdn.discordapp.com/attachments/257543543403315200/470315489336360961/GUI_T_Icon1_Attr05.png",
  WIND:
    "https://cdn.discordapp.com/attachments/257543543403315200/470315491030728719/GUI_T_Icon1_Attr06.png",
  DIVINE:
    "https://cdn.discordapp.com/attachments/257543543403315200/470315492243144705/GUI_T_Icon1_Attr07.png"
};
var stars =
  "https://cdn.discordapp.com/attachments/257543543403315200/470282674662014976/GUI_T_Icon1_Other_Lv.png";

var CARDTYPE = {
  "Spell Card": "https://cdn.discordapp.com/emojis/387858760418197516.png",
  "Trap Card":
    "https://cdn.discordapp.com/attachments/257543543403315200/470304114170134528/GUI_T_Icon1_Attr09.png",
  Normal: "https://cdn.discordapp.com/emojis/387858760409808896.png",
  Field: "https://cdn.discordapp.com/emojis/387858760296562688.png",
  Continuous: "https://cdn.discordapp.com/emojis/387858694718881792.png",
  Equip: "https://cdn.discordapp.com/emojis/387858759185072128.png",
  Counter: "https://cdn.discordapp.com/emojis/387858759336067073.png",
  "Quick-Play": "https://cdn.discordapp.com/emojis/387858760158412800.png",
  Ritual: "https://cdn.discordapp.com/emojis/387858759977926666.png"
};

var width = 1600;
var height = 1000;

var stage = new Konva.Stage({
  container: "container",
  width: width,
  height: height
});

var layer = new Konva.Layer();
stage.add(layer);

var cardName = new Konva.Text({
  x: 20,
  y: 535,
  fontSize: 24,
  fontFamily: "Calibri",
  shadowColor: "#021123",
  shadowOffset: {
    x: 2,
    y: 2
  },
  shadowOpacity: 1,
  shadowBlur: 0.5,
  fill: "white"
});

var cardType = new Konva.Text({
  x: 50,
  y: 580,
  fontSize: 24,
  fontFamily: "Calibri",
  shadowColor: "#021123",
  shadowOffset: {
    x: 2,
    y: 2
  },
  shadowOpacity: 1,
  shadowBlur: 0.5,
  fill: "white"
});

var cardAttr = new Konva.Text({
  x: 210,
  y: 580,
  fontSize: 24,
  fontFamily: "Calibri",
  shadowColor: "#021123",
  shadowOffset: {
    x: 2,
    y: 2
  },
  shadowOpacity: 1,
  shadowBlur: 0.5,
  fill: "white"
});

var level = new Konva.Image({
  width: 25,
  height: 25,
  x: 20,
  y: 580
});

var type = new Konva.Image({
  width: 25,
  height: 25,
  x: 180,
  y: 580
});

var field = new Konva.Image({
  width: 800,
  height: 800,
  x: 500,
  y: 70
});

var deck = new Konva.Image({
  x: 1069,
  y: 731,
  width: 86,
  height: 118
});

var deckint = new Image();
deckint.onload = function() {
  deck.image(deckint);
  layer.draw();
};

deckint.src =
  "https://cdn.discordapp.com/attachments/257543543403315200/470787798010429440/latest.png";

layer.add(deck);

var fieldInit = new Image();
fieldInit.onload = function() {
  field.image(fieldInit);
  layer.draw();
};
fieldInit.src =
  "https://cdn.discordapp.com/attachments/257543543403315200/470784081848696832/newfield.png";

layer.add(field);

var levelInit = new Image();
levelInit.onload = function() {
  level.image(levelInit);
  layer.draw();
};

var typeInit = new Image();
typeInit.onload = function() {
  type.image(typeInit);
  layer.draw();
};

var cardDesText = new Konva.Text({
  x: 20,
  y: 650,
  fontSize: 24,
  fontFamily: "Calibri",
  shadowColor: "#021123",
  width: 420,
  shadowOffset: {
    x: 2,
    y: 2
  },
  shadowOpacity: 1,
  shadowBlur: 0.5,
  fill: "white"
});

var cardSpecies = new Konva.Text({
  x: 20,
  y: 625,
  fontSize: 24,
  fontFamily: "Calibri",
  shadowColor: "#021123",
  shadowOffset: {
    x: 2,
    y: 2
  },
  shadowOpacity: 1,
  shadowBlur: 0.5,
  fill: "#71DE6D"
});

var cardStats = new Konva.Text({
  x: 200,
  y: 920,
  fontSize: 28,
  fontFamily: "Calibri",
  shadowColor: "#021123",
  shadowOffset: {
    x: 2,
    y: 2
  },
  shadowOpacity: 1,
  shadowBlur: 0.5,
  fill: "white"
});

var cardInfoCard = new Konva.Image({
  width: 286,
  height: 450,
  x: 90,
  y: 20
});

var cardInfoDes = new Konva.Image({
  width: 445,
  height: 95,
  x: 10,
  y: 520
});

var infoDes = new Image();
infoDes.onload = function() {
  cardInfoDes.image(infoDes);
  layer.draw();
};

infoDes.src =
  "https://cdn.discordapp.com/attachments/257543543403315200/470265324902678528/cardinfo.png";

layer.add(cardInfoDes);

var infoCard = new Image();
infoCard.onload = function() {
  cardInfoCard.image(infoCard);
  layer.draw();
};

layer.add(cardInfoCard);
layer.add(level);
layer.add(type);
layer.add(cardType);
layer.add(cardAttr);

var cardInfoBox = new Konva.Image({
  width: 362,
  height: 478,
  x: 50,
  y: 15
});
var bg = new Image();
bg.onload = function() {
  cardInfoBox.image(bg);
  layer.draw();
};

bg.src =
  "https://cdn.discordapp.com/attachments/257543543403315200/470263270415138837/newbg.png";

layer.add(cardInfoBox);
layer.add(level);

var cardInfoBox2 = new Konva.Image({
  width: 444,
  height: 343,
  x: 10,
  y: 620
});
var bg2 = new Image();
bg2.onload = function() {
  cardInfoBox2.image(bg2);
  layer.draw();
};

bg2.src =
  "https://cdn.discordapp.com/attachments/257543543403315200/470278089709191168/cardinfo2.png";

layer.add(cardInfoBox2);

stage.add(layer);
let i = 0;
cards.forEach(card => {
  let imgSrc = new Image();
  imgSrc.onload = function() {
    let image = new Konva.Image({
      x: stage.getWidth() / 2 - 525 / 2 + i * 110,
      y: stage.getHeight() / 2 + 725 / 2,
      width: 100,
      height: 137,
      image: imgSrc
    });

    image.on("mouseover", function() {
      let log = false;
      document.body.style.cursor = "pointer";
      this.shadowColor("#0080BA");
      this.shadowBlur(10);
      this.draggable(true);
      let cardUrl = encodeURI(
        `https://db.ygoprodeck.com/api/v2/cardinfo.php?name=${card}`
      ).replace("&", "%26");
      getCardInfo(cardUrl, card, log);
    });
    image.on("mouseout", function() {
      this.shadowColor("");
      document.body.style.cursor = "default";
    });
    image.on("dragend", function(e) {
      socket.emit("card drop", e);
    });
    i++;
    boximg.push(image);
    layer.add(image);
    layer.draw();
  };
  imgSrc.src = `https://yugiohprices.com/api/card_image/${card}`;
});

layer.add(cardName);
layer.add(cardDesText);
layer.add(cardStats);
layer.add(cardSpecies);

function getCardInfo(info, src, log) {
  axios
    .get(info)
    .then(function(response) {
      infoCard.src = `https://yugiohprices.com/api/card_image/${src}`;
      cardInfoCard.moveToTop();
      cardName.setText(response.data[0][0].name);
      if (log == false) {
        socket.emit("card hover", response.data[0][0].name);
      }
      cardDesText.setText(response.data[0][0].desc);
      response.data[0][0].desc > 50
        ? cardDesText.fontSize(18)
        : cardDesText.fontSize(24);
      if (
        response.data[0][0].type == "Effect Monster" ||
        response.data[0][0].type == "Tuner Monster" ||
        response.data[0][0].type == "Normal Monster"
      ) {
        cardStats.setText(
          `ATK/${response.data[0][0].atk} DEF/${response.data[0][0].def}`
        );
        cardAttr.setText(response.data[0][0].attribute);
        levelInit.src = stars;
        cardType.setText(response.data[0][0].level);
        // cardAttr.setText(response.data.card.attribute);
        typeInit.src = ATTRIBUTE[response.data[0][0].attribute];
        cardSpecies.setText(
          `[${response.data[0][0].race}/${response.data[0][0].type || ""}]`
        );
      }
      if (
        response.data[0][0].type == "Trap Card" ||
        response.data[0][0].type == "Spell Card"
      ) {
        levelInit.src = CARDTYPE[response.data[0][0].type];
        cardType.setText(response.data[0][0].type);
        cardAttr.setText(response.data[0][0].race);
        typeInit.src = CARDTYPE[response.data[0][0].race];
        cardSpecies.setText("");
        cardStats.setText("");
        layer.add(type);
        layer.draw();
      }
      layer.draw();
    })
    .catch(function(error) {
      console.log(error);
    });
}
