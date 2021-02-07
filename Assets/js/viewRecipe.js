function saveOnSession(imgDir,title,desc,price,i,dp){
    sessionStorage.setItem('item', imgDir)
    sessionStorage.setItem('title',title )
    sessionStorage.setItem('desc', desc)
    sessionStorage.setItem('price', price)
    sessionStorage.setItem('icon', i)
    sessionStorage.setItem('description', dp)
    
    location.href='/recipe.html';
}