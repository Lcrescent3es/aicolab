var express = require('express');
var router = express.Router();
var app = require('../app');

//http://localhost:12345/users/
module.exports = router;
//여기서부터 내 코드(toyrest.js 파일에서 가져옴.)
//app=>router, /user=>/로 변경


router.get('/', (req, res)=>{
  console.log(app.getUserCounter());
  res.send(app.getUsers());
});

router.get('/:id', (req, res)=>{
  const id = req.params.id;
  //array의 filter기능, filtered array를 새로 받아옴
  //user의 id와 방금 입력받은 id가 같으면 그것을 기반으로 array를
  //만들어달라-filter map(자바스크립트 기초파트)
  const filtered = app.getUsers().filter((user)=>user.id == id);
  //동일한 id가 복수의 입력이 허용되는 시스템이라면
  //length가 2이상일 가능성이 있으니 방어적인 코딩을 하는게 좋다
  if(filtered.length > 0){ //length ==2
      res.send(filtered[0]);
  }
  else{
      res.status(404).send('데이터가 존재하지 않습니다.');
  }
});

router.post('/', (req, res)=>{
  const body = req.body;

  if(!body.name){
      return res.status(400).send('name 을 보내주세요.');
      //return은 여기서 코드가 끝이 남
  }
  else if(!body.region){
      return res.status(400).send('region 을 보내주세요.');
  }

  const name = body.name;
  const region = body.region;

  const data = {
      id: app.getUserCounter(+1),
      name: name,
      region: region
  };
  //test하는 request를 보내는 client가 하나 있으면 test가능
  app.pushUser(data);
  //data push
  console.log(data);

  res.send(data);
});

router.put('/:id', (req, res)=>{
  const id = req.params.id;
  //특정 유저를 찾고 데이터가 있다면 받아오기
  const index = users.findIndex((user)=>user.id==id);
  const user = users.find((user) =>user.id==id);
  if(user){
      if(req.body.name)
          users[index].name=req.body.name;
      if(req.body.region)
          users[index].region=req.body.region;
      res.send(user);
  }
  else{
      res.status(404).send('데이터가 없어요.');
  }
});

router.delete('/:id',(req,res)=>{
  const id = req.params.id;
  const index = users.findIndex((user)=>user.id==id);
  console.log(index);

  if(index == -1){
      res.status(404).send('삭제할 데이터가 존재하지 않습니다.');
  }
  else{
      users.splice(index,1);
      res.send('삭제하였습니다.');
  }

});