export const validateQuantity = ( props ) =>{
    props.products.lenght >0 && (
        props.products.filter((item, index) => item.quantity !==0 )
        
    )
}