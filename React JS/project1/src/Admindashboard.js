import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
class Admindashboard extends Component{
    constructor(){
        super();
        this.state = {MenuDetail:[],notify:'',notifyUpdate:'',notifyAdd:'',Menu:{id:'',fname:'',description:'',price:''},newMenu:{},getPid:'',msgUp:''}
    }
    showMenu(){
        axios.get("http://localhost:8181/menulist").then(response=>{
            console.log("Product data",response.data);
             this.setState({MenuDetail:response.data});
        })
    }
    componentDidMount(){
        this.showMenu();
    }
    onChangeHandler=(e)=>
    {
        let {name,value}=e.target;
        let {Menu}=this.state;
        this.setState({Menu:{...Menu,[name]:value}});
    }
    onAdd=()=>{
        let {notifyAdd}=this.state;
        this.setState({notifyAdd:true});
    }
    getData(pid){
        axios.get("http://localhost:8181/menulist/editList/"+pid).then(response=>{
            console.log("update data",response.data);
             this.setState({newMenu:response.data});
        }).catch(err=>{
            console.log(err)
        })
    }
    onUpdateH = (prid)=>{
        let {notifyUpdate}=this.state;
        this.setState({notifyUpdate:true});
        console.log(notifyUpdate);
        this.getData(prid);
        console.log("prid:",prid);
    }
    onChangeHandlerUp =(e)=>{
         
        let {name,value}=e.target;
        this.setState({getPid:value});
        
       this.setState({newMenu:{...this.state.newMenu,[name]:value}});
       //console.log(value);
       }
        onDeleteH = (pid)=>{
         axios.delete("http://localhost:8181/menulist/deleteList/"+pid).then(response=>{
            console.log("Delete",response);
            this.showMenu();
        })
    }
    onSubmitH = (e)=>{
        e.preventDefault();
        let {newMenu,Menu,notifyUpdate} = this.state;
       const URL = "http://localhost:8181/menulist/updateList/" + newMenu._id;
        axios.put(URL,this.state.newMenu).then(response=>{
            console.log(response);
                this.setState({msgUp:'Record has been updated'});
                this.showMenu();
         })
         newMenu.fname = '';
         newMenu.description ='';
         newMenu.price ='';
        //  notifyUpdate=false;
        //  this.setState({notifyUpdate});
         this.setState({newMenu});
    }
    onSubmit=(e)=>{
        e.preventDefault();
       // let {notify}=this.state;
       let {newMenu,Menu} = this.state;
        this.setState({notify:'Item has been successfully added'});
        const URL="http://localhost:8181/menulist/addList";
        axios.post(URL,this.state.Menu).then(response=>{
            console.log(response.data);
            this.showMenu();
        })
        Menu.fname = '';
        Menu.description ='';
        Menu.price ='';
        this.setState({...Menu});
    }
    render(){
        let {MenuDetail,Menu,notify,notifyUpdate,newMenu,notifyAdd,msgUp}=this.state;
        return(
            <>
             <Navbar bg="dark" expand="lg">
                <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse className="justify-content-end">
                {/* <Nav.Link> <Link to="/users" className='btn btn-success'>Users</Link></Nav.Link> */}
                <Nav.Link> <Link to="/login" className='btn btn-success'>Log out</Link></Nav.Link>
                </Navbar.Collapse>
                </Container>
                </Navbar>
                <br></br>
             <table className='table table-striped'>
                    <tbody>
                        <tr>
                        {/* <th>Product ID</th> */}
                        <th>Item Name</th>
                        <th>Item Description</th>
                        <th>Item Price</th>
                        <th>Update</th>
                        <th>Delete</th>
                        </tr>
                        {MenuDetail.map((item,idx)=>{
                            return(
                                <tr key={idx}>
                                {/* <td>{item._id}</td> */}
                                <td>{item.fname}</td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td><button className='btn btn-success' onClick={()=>this.onUpdateH(item._id)}>Update</button></td>
                                <td><button className='btn btn-danger' onClick={()=>this.onDeleteH(item._id)}>Delete</button></td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
                <br></br>
                <button className='btn btn-success' onClick={()=>this.onAdd()}>Add Product</button>
                {notifyAdd === true && <div className='container'>
                <h3 className='text-primary'>{notify}</h3>
           <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Item Name</label>
                        <input type="text" className='form-control' name="fname" value={Menu.fname} onChange={this.onChangeHandler}/>
                    </div>
                    <div className='form-group'>
                        <label>Description</label>
                        <input type="text" className='form-control' name="description" value={Menu.description} onChange={this.onChangeHandler}/>
                    </div>
                    <div className='form-group'>
                        <label>Price</label>
                        <input type="text" className='form-control' name="price" value={Menu.price} onChange={this.onChangeHandler}/>
                    </div>
                    <div className='form-group'>
                        <button type="submit" className='btn btn-info mt-2'>Submit</button>
                    </div>
                </form>
           </div>}
          {notifyUpdate === true && <div className='container'>
              <h3 className='text-primary'>{msgUp}</h3>
           <form onSubmit={this.onSubmitH}>
                    <div className='form-group'>
                        <label>Item Name</label>
                        <input type="text" className='form-control' name="fname" value={newMenu.fname} onChange={this.onChangeHandlerUp}/>
                    </div>
                    <div className='form-group'>
                        <label>Description</label>
                        <input type="text" className='form-control' name="description" value={newMenu.description} onChange={this.onChangeHandlerUp}/>
                    </div>
                    <div className='form-group'>
                        <label>Price</label>
                        <input type="text" className='form-control' name="price" value={newMenu.price} onChange={this.onChangeHandlerUp}/>
                    </div>
                    <div className='form-group'>
                        <button type="submit" className='btn btn-info mt-2'>Submit</button>
                    </div>
                </form>
           </div> } 
            </>
        )
    }
}
export default Admindashboard;