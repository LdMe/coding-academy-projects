import config from '../../config';
const axios = config.axios;

export default  function(id){
    let result= window.confirm("dou you really want to delete the Product");
    if(result){
        axios.post("/Product/delete", {_id: id})
            .then(res => {

                alert(res.data);
            })
            .catch(err => {

                alert(err.response.data);


            });
    }

}