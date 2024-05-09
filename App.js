import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Provider as PaperProvider } from 'react-native-paper';

export default function App() {
    const [displayConta, setDisplayConta] = useState('');
    const [displayResultado, setDisplayResultado] = useState('0');
    const [numeroAtual, setNumeroAtual] = useState('');
    const [numeroAnterior, setNumeroAnterior] = useState('');
    const [operador, setOperador] = useState('');

    const handleNumero = (numero) => {
        setNumeroAtual(numeroAtual.concat(numero));
        setDisplayConta(displayConta.concat(numero));
    };

    const handleOperador = (op) => {

        if (numeroAnterior.length > 0 && numeroAtual.length > 0 && operador.length > 0) {
            var numero = realizaCalculo(numeroAnterior, numeroAtual, operador).toString();
            setNumeroAnterior(numero);
            setNumeroAtual('');
            setDisplayResultado(numero);
            setOperador(op);
            setDisplayConta(displayConta.concat(op));
        } else {
            setNumeroAnterior(numeroAtual);
            setNumeroAtual('');
            setOperador(op);
            setDisplayConta(displayConta.concat(op));
        }
    };

    const realizaCalculo = (numero1, numero2, operacao) => {
        switch (operacao) {
            case '+':
                return parseFloat(numero1) + parseFloat(numero2);
            case '-':
                return parseFloat(numero1) - parseFloat(numero2);
            case '*':
                return parseFloat(numero1) * parseFloat(numero2);
            case '/':
                return parseFloat(numero1) / parseFloat(numero2);
            default:
                return '';
        }
    };

    const handleIgual = () => {
        if (numeroAnterior.length > 0 && numeroAtual.length > 0 && operador.length > 0) {
            var numero = realizaCalculo(numeroAnterior, numeroAtual, operador).toString();
            setNumeroAnterior('');
            setNumeroAtual(numero);
            setOperador('');
            setDisplayResultado(numero);
        }
    };

    const handleLimpar = () => {
        setDisplayResultado('0');
        setDisplayConta('');
        setNumeroAtual('');
        setNumeroAnterior('');
        setOperador('');
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <Text style={styles.display}>{displayResultado}</Text>
                <Text style={styles.display}>{displayConta}</Text>
                <View style={styles.buttonRow}>
                    <Button style={styles.button} onPress={() => handleNumero('7')}>7</Button>
                    <Button style={styles.button} onPress={() => handleNumero('8')}>8</Button>
                    <Button style={styles.button} onPress={() => handleNumero('9')}>9</Button>
                    <Button style={styles.button} onPress={() => handleOperador('/')}>/</Button>
                </View>
                <View style={styles.buttonRow}>
                    <Button style={styles.button} onPress={() => handleNumero('4')}>4</Button>
                    <Button style={styles.button} onPress={() => handleNumero('5')}>5</Button>
                    <Button style={styles.button} onPress={() => handleNumero('6')}>6</Button>
                    <Button style={styles.button} onPress={() => handleOperador('*')}>*</Button>
                </View>
                <View style={styles.buttonRow}>
                    <Button style={styles.button} onPress={() => handleNumero('1')}>1</Button>
                    <Button style={styles.button} onPress={() => handleNumero('2')}>2</Button>
                    <Button style={styles.button} onPress={() => handleNumero('3')}>3</Button>
                    <Button style={styles.button} onPress={() => handleOperador('-')}>-</Button>
                </View>
                <View style={styles.buttonRow}>
                    <Button style={styles.button} onPress={handleLimpar}>C</Button>
                    <Button style={styles.button} onPress={() => handleNumero('0')}>0</Button>
                    <Button style={styles.button} onPress={handleIgual}>=</Button>
                    <Button style={styles.button} onPress={() => handleOperador('+')}>+</Button>
                </View>
            </View>
            <StatusBar style="auto" />
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    display: {
        fontSize: 32,
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        width: '100%',
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
});