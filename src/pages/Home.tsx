import {
    IonAvatar,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent, IonItem,
    IonLabel,
    IonPage,
    IonRow,
    useIonViewWillEnter,
    withIonLifeCycle
} from '@ionic/react';
import './Home.css';
import React, {useState} from "react";
import {PokemonApi} from "../api/results/PokemonApi";
const Home: React.FC = () => {
    const [pokemon, setPokemon] = useState<PokemonApi>({results: []});
    const [isInfiniteDisabled, setIsInfiniteDisabled] = useState<boolean>();

    async function getPokemon(url:string) {
        try {
            setIsInfiniteDisabled(true)

            let response = await fetch(url);
            let httpPokemonApi = await response.json()
            setPokemon({
                next: httpPokemonApi.next,
                results: [...pokemon.results,...httpPokemonApi.results]
            })

            setIsInfiniteDisabled(false)
        } catch (e) {
            console.error(e)
        }
    }

    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function getNumber(string: string) {
        let yo = string.split('/', 7);
        return yo[yo.length-1] ;
    }

    useIonViewWillEnter(async () => await getPokemon('https://pokeapi.co/api/v2/pokemon'));

    return (
        <IonPage>
            <IonContent fullscreen>
                 <IonCard>
                     <IonCardContent className={'title__pokedex'}>Pokedex</IonCardContent>
                     <IonAvatar className={"pokeball__fond"}>
                         <img src="pokeball_black.png" alt=""/>
                     </IonAvatar>
                    <IonRow className={"ion-margin-top"} >
                    {pokemon.results.map(value =>
                        <IonCardHeader className={"ion-margin-bottom"} onClick={()=>window.location.href="description/"+value.name}>
                            <IonCardTitle className={"ion-color"} >{capitalizeFirstLetter(value.name)} </IonCardTitle>
                            <IonAvatar className={"ion-float-right"}>
                                <img className={"pokemon"} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getNumber(value.url)}.png`} alt={value.name}/>
                            </IonAvatar>
                            <img className={"pokeball"} src="pokeball.png" alt=""/>
                        </IonCardHeader>
                    )}
                    </IonRow>
                </IonCard>

                <IonInfiniteScroll onIonInfinite={async () => await getPokemon(pokemon.next as string)} threshold="100px" disabled={isInfiniteDisabled}>
                    <IonInfiniteScrollContent loadingSpinner="circles" loadingText="Loading more data..."/>
                </IonInfiniteScroll>

            </IonContent>
        </IonPage>
    );
};

export default withIonLifeCycle(Home);
