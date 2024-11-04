export const createOrder = (formCheckData, cart, total)=>{
    return {
        buyer: {
            name: formCheckData.target.name.value,
            email: formCheckData.target.email.value,
            phone: formCheckData.target.phone.value,
            address: formCheckData.target.address.value,
        },
        items: cart,
        total: total,
    };
}