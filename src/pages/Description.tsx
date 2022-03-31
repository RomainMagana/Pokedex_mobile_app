import {
    IonAvatar,
    IonBackButton,
    IonButtons, IonCol,
    IonContent, IonGrid,
    IonHeader, IonImg,
    IonItem,
    IonLabel,
    IonPage, IonProgressBar, IonRow, IonTitle,
    IonToolbar,
    useIonViewWillEnter,
} from '@ionic/react';
import React, {useState} from "react";
import {RouteComponentProps} from "react-router";
import {Pokemon} from "../api/response/Pokemon";
import './Description.css';
interface DescriptionPageProps extends RouteComponentProps <{ name:string; }> {
}

const Description: React.FC<DescriptionPageProps> = ({match}) => {
    const [pokemon, setPokemon] = useState<Pokemon>();
    async function GetPokemonByName(name: string) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json() as Pokemon;
        setPokemon(data);
    }

    function capitalizeFirstLetter(string: string | undefined) {
        if (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }

    function getColor(name: string) :string {
        switch (name) {
            case 'electric':
                return '#FFD76F';
            case 'fire':
                return '#FF8C00';
            case 'grass':
                return '#7fba4a';
            case 'water':
                return '#29a1c7';
            case 'bug':
                return '#A8B8B8';
            case 'dark':
                return '#4F4F4F';
            case 'dragon':
                return '#7F00FF';
            case 'fairy':
                return '#FF00FF';
            case 'fighting':
                return '#C03028';
            case 'flying':
                return '#A890F0';
            case 'ghost':
                return '#705898';
            case 'ground':
                return '#9E9E9E';
            case 'ice':
                return '#98D8D8';
            case 'normal':
                return '#A8A878';
            case 'poison':
                return '#A040A0';
            case 'psychic':
                return '#F85888';
            case 'rock':
                return '#B8A038';
            case 'steel':
                return '#B8B8D0';
            case 'unknown':
                return '#000000';
            default:
                return '#000000';
        }
    }


    useIonViewWillEnter(async () => {
        await GetPokemonByName(match.params.name);
    });

    return (
        <IonPage>
            <IonContent>

                <IonGrid style={{backgroundColor : getColor(pokemon?.types[0].type.name as string), height: "100%", display: "flex", flexFlow: "column"}} className={"ion-no-padding"}>
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons slot="start">
                                <IonBackButton defaultHref="/"/>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonRow>
                        <IonLabel className={"name__pokemon"}>
                            <IonLabel>{capitalizeFirstLetter(pokemon?.name)}</IonLabel>
                            <IonLabel style={{display: "flex"}}>
                                {pokemon?.types.map((type, index) => (
                                    <p>{type.type.name}</p>
                                ))}
                            </IonLabel>
                        </IonLabel>
                    </IonRow>
                    <IonRow className={"ion-justify-content-center"}>
                        <IonCol size={"8"}>
                            <IonImg src={pokemon?.sprites.other["official-artwork"].front_default} style={{position: 'relative', zIndex: "1"}}/>
                            <IonAvatar className={"pokeball__fond__description"}>
                                <img src="pokeball.png" alt=""/>
                            </IonAvatar>
                        </IonCol>
                    </IonRow>
                    <IonRow className={"stats ion-justify-content-center ion-padding-bottom ion-padding-top"}>
                        <IonCol size={"11"}>
                            <IonLabel>Base Stats</IonLabel>
                        </IonCol>
                    </IonRow>
                    <IonRow class="ion-justify-content-center" style={{backgroundColor:"white", width: "100vw", color: "black", height: "100%"}}>
                        {pokemon?.stats.map((stat, index) => (
                            <IonCol size={"11"} className={"ion-nowrap"}>
                                <IonLabel>{stat.stat.name} </IonLabel>
                                <IonProgressBar color="medium" value={stat.base_stat / 100}/>
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>

            </IonContent>
        </IonPage>
    )
};
export default Description;