//file: src/webpages/favorites.js
import Note from "./components/CharSheet";
import React, { useEffect } from 'react';

const Favorites = () => {
    useEffect(() => {
        document.title = 'My Favorites';
    });    
    
    return (
        <div>
            <Note title="Receita de miojo">
                Bata com um martelo antes de abrir o pacote. Misture o tempero, coloque
                em uma vasilha e aproveite seu snack :)
            </Note>
            <Note title="Sorvete de banana">
                Coloque a banana no congelador e espere.
            </Note>
        </div>
    );
};

export default Favorites;