export const formatPrice=(price: number)=>{
    return new Intl.NumberFormat("mn-MN", {
        style: 'currency',
        currency: "MNT"
    }).format(price)
}