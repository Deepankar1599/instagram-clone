import React,{useState, useEffect} from 'react';
import Post from './Post'
import './App.css';
import {db} from './firebase'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button,Input } from '@material-ui/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import ImageUpload from './ImageUpload'



const auth=firebase.auth();


function getModalStyle() {
  const top = 50;
  const left = 50; 

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
 
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));




function App() {
  //create modal
  const classes=useStyles()
  const[modalStyle]=useState(getModalStyle);

  const[posts,setPosts]=useState([]);
  const[open,setOpen]=useState(false)

  //user authentication
  const[openSignIn,setopenSignIn]=useState(false)
  const[username,setUsername]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');

  const[user,setUser]=useState(null);




  useEffect(()=>{
    const unsubscribe= auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        // console.log(authUser)
        setUser(authUser)
        
       
      }
      else{
        setUser(null)
      }
    })
    return()=>{
      unsubscribe();
    }
  },[user,username])
  //useEffect->Run the piece of code based on specific condition

  useEffect(() => {
   //this is where the code runs
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>({
        id:doc.id,
        post:doc.data()
      })));
    })
  }, [])

  const SignUp=(event)=>{
    event.preventDefault()
    
    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser)=>{
        return  authUser.user.updateProfile({
                displayName:username
      })
    })
    .catch((error)=>alert(error.message));

    setopenSignIn(false);
  }

  const signIn=(event)=>{
    event.preventDefault()
    auth.
    signInWithEmailAndPassword(email,password)
    .catch((error)=>alert(error.message))

    setopenSignIn(false);
  }
  return (
    <div className="app">
      
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>

      <form className="app__signup">
        <center>     
        <img
          className="app__headerImage"
          style={{width:"150px"}}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" 
          alt="instagram.png"/>  
        
      </center>
      <Input  
             
              type="text"
              placeholder="username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
               />
              
         <Input  
              type="email"
              placeholder="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
               />  

         <Input  
              type="password"
              placeholder="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
               />  
          <Button className="style_btn" onClick={SignUp}>Create Account</Button>
          </form>
        </div>   
      </Modal>

      <Modal
        open={openSignIn}
        onClose={()=>setopenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>

      <form className="app__signup">
        <center>     
        <img
          className="app__headerImage"
          style={{width:"150px"}}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" 
          alt="instagram.png"/>  
        
      </center>
    
              
         <Input  
              type="email"
              placeholder="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
               />  

         <Input  
              type="password"
              placeholder="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
               />  
          <Button className="style_btn" onClick={signIn}>SignIn</Button>
          </form>
        </div>   
      </Modal>
        <div className="app__header" >
           <img
           className="app__headerImage"
            style={{width:"150px"}}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" 
            alt="instagram.png"/>  

        {
          user?(
            <Button onClick={()=>auth.signOut()}>Logout</Button>
          ):(
            <div className="app__loginContainer">
              <Button onClick={()=>setopenSignIn(true)}>SignIn</Button>
            <Button onClick={()=>setOpen(true)}>SignUp</Button>
            </div>
          )
        }
        </div> 

      
      
        
      {/* <h1>“I Once Saw Him Kill Three Men In A Bar... With A Pencil.”</h1> */}
    
      {/* {Header} */}
      {/* {Posts} */}
        <div className="app__posts">
      {
        posts.map(({id,post})=>(
          <Post 
          key={id}
          postId={id}
          user={user}
            username={post.username} 
            caption={post.caption} 
            imageUrl={post.imageUrl} />
        ))
      }
      </div>

         {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ):(
        <h3>Sorry!, you need to login to upload
        </h3>
      )} 
     
        

    </div>
  );
}

export default App;
