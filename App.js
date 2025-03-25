import * as React from 'react';
import { ScrollView, View, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { TextInput, Text, Button, List } from 'react-native-paper';

export default function App() {
    const [cep, setCep] = React.useState("");
    const [render, setRender] = React.useState({});
    const [selectedValue, setSelectedValue] = React.useState(null);
    const [expanded, setExpanded] = React.useState(false);

    const handleAccordionPress = () => setExpanded(!expanded);

    const handleItemPress = (value) => {
        setSelectedValue(value);
        setExpanded(false);
    };

    const BuscaCep = (xcep) => {
        if (xcep.length !== 8 || isNaN(xcep)) {
            alert("CEP inválido! Insira um CEP com 8 dígitos numéricos.");
            return;
        }

        let url = `https://viacep.com.br/ws/${xcep}/json/`;
        fetch(url)
            .then((resp) => resp.json())
            .then((dados) => {
                if (dados.erro) {
                    alert("CEP não encontrado!");
                } else {
                    setRender(dados);
                    setSelectedValue(dados.uf);
                }
            })
            .catch((erro) => console.log(erro));
    };
    
    const novaBusca = () => {
        setCep("");
        setRender({});
        setSelectedValue(null);
        setExpanded(false);
    };
    
    const handleSubmit = () => {
        BuscaCep(cep);
    };

    return (
        <ImageBackground
            source={require('./assets/bussola.jpg')}
            style={styles.background}
            resizeMode="cover" 
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>ViaCEP</Text>

                <TextInput
                    style={styles.input}
                    label="CEP:"
                    mode="outlined"
                    keyboardType="numeric"
                    value={cep}
                    onChangeText={setCep}
                    onSubmitEditing={handleSubmit} 
                    returnKeyType="search" 
                />

                <Button icon="tab-search" onPress={() => BuscaCep(cep)} mode="contained" style={styles.button}>
                    Buscar
                </Button>

                <TextInput
                    style={styles.input}
                    label="Endereço:"
                    value={render.logradouro || ""}
                    mode="outlined"
                    onChangeText={(value) => setRender({ ...render, logradouro: value })}
                />

                <TextInput
                    style={styles.input}
                    label="Número:"
                    mode="outlined"
                    onChangeText={(value) => setRender({ ...render, numero: value })}
                />

                <TextInput
                    style={styles.input}
                    label="Complemento:"
                    mode="outlined"
                    onChangeText={(value) => setRender({ ...render, complemento: value })}
                />

                <TextInput
                    style={styles.input}
                    label="Bairro:"
                    value={render.bairro || ""}
                    mode="outlined"
                    onChangeText={(value) => setRender({ ...render, bairro: value })}
                />

                <TextInput
                    style={styles.input}
                    label="Cidade:"
                    value={render.localidade || ""}
                    mode="outlined"
                    onChangeText={(value) => setRender({ ...render, localidade: value })}
                />

                <List.Section title="Estado" style={styles.list}>
                    <List.Accordion
                        title={selectedValue == null ? 'Selecione o Estado' : selectedValue}
                        expanded={expanded}
                        onPress={handleAccordionPress}
                        titleStyle={styles.listText}
                        style={styles.accordion}
                    >
                        {[
                            { label: 'Acre', value: 'AC' },
                            { label: 'Alagoas', value: 'AL' },
                            { label: 'Amapá', value: 'AP' },
                            { label: 'Amazonas', value: 'AM' },
                            { label: 'Bahia', value: 'BA' },
                            { label: 'Ceará', value: 'CE' },
                            { label: 'Distrito Federal', value: 'DF' },
                            { label: 'Espírito Santo', value: 'ES' },
                            { label: 'Goiás', value: 'GO' },
                            { label: 'Maranhão', value: 'MA' },
                            { label: 'Mato Grosso', value: 'MT' },
                            { label: 'Mato Grosso do Sul', value: 'MS' },
                            { label: 'Minas Gerais', value: 'MG' },
                            { label: 'Pará', value: 'PA' },
                            { label: 'Paraíba', value: 'PB' },
                            { label: 'Paraná', value: 'PR' },
                            { label: 'Pernambuco', value: 'PE' },
                            { label: 'Piauí', value: 'PI' },
                            { label: 'Rio de Janeiro', value: 'RJ' },
                            { label: 'Rio Grande do Norte', value: 'RN' },
                            { label: 'Rio Grande do Sul', value: 'RS' },
                            { label: 'Rondônia', value: 'RO' },
                            { label: 'Roraima', value: 'RR' },
                            { label: 'Santa Catarina', value: 'SC' },
                            { label: 'São Paulo', value: 'SP' },
                            { label: 'Sergipe', value: 'SE' },
                            { label: 'Tocantins', value: 'TO' }
                        ].map((estado) => (
                            <List.Item
                                key={estado.value}
                                title={estado.label}
                                titleStyle={styles.listText}
                                onPress={() => handleItemPress(estado.value)}
                            />
                        ))}
                    </List.Accordion>
                </List.Section>

                <Text style={styles.selectedText}>Estado selecionado: {selectedValue}</Text>

                {/* Botão Nova Busca */}
                <Button icon="reload" onPress={novaBusca} mode="contained" style={styles.novaBuscaButton}>
                    Nova Busca
                </Button>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1, 
        width: '100%',
        height: '100%',
    },
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    title: {
        color: 'black', 
        fontSize: 30,
        fontWeight: 'bold', 
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#FFF',
        width: '45%',
        marginBottom: 10,
        paddingHorizontal: 8,
    },
    button: {
        marginTop: 5,
        width: '45%',
    },
    list: {
        width: '45%',
    },
    accordion: {
        backgroundColor: '#4A4A4A', 
        overflow: 'hidden',
    },
    listText: {
        color: 'white',
        fontSize: 14,
    },
    listItem: {
        backgroundColor: '#4A4A4A', 
    },
    selectedText: {
        marginTop: 10,
        fontSize: 8,
        color: '#FFF',
        textAlign: 'center',
    },
    novaBuscaButton: {
        marginTop: 20,
        width: '45%',
    },
});
