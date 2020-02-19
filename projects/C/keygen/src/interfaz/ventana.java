package interfaz;

import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPasswordField;
import javax.swing.JTextField;

import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.StringSelection;
import java.awt.Toolkit;
 import generator.Encoder2;
import generator.Encoder3;
//import generator.Saver;
/**
 * Clase Ventana
 * Muestra la estructuta que deberia tener una Ventana en Java con la libreria
 * Swing, contiene una etiqueta, un caja de texto y un boton, que tiene la
 * accion de mostrar el texto en la caja por una ventana de mensaje.
 * @author Daniel Alvarez (a3dany)
 */
public class ventana extends JFrame implements ActionListener {

    private JLabel texto,texto2,texto3,texto4,texto5,texto_size,texto_seed;           // etiqueta o texto no editable
    private JTextField caja2,caja3,seedBox;        // caja de texto, para insertar datos
    private JPasswordField caja;
    private JButton boton;          // boton con una determinada accion
    private JCheckBox check;
    private JComboBox combo,combo_size;
    public ventana() {
        super();                    // usamos el contructor de la clase padre JFrame
        configurarVentana();        // configuramos la ventana
        inicializarComponentes();   // inicializamos los atributos o componentes
    }

    private void configurarVentana() {
        this.setTitle("Keygen");                   // colocamos titulo a la ventana
        this.setSize(320, 320);                                 // colocamos tamanio a la ventana (ancho, alto)
        this.setLocationRelativeTo(null);                       // centramos la ventana en la pantalla
        this.setLayout(null);                                   // no usamos ningun layout, solo asi podremos dar posiciones a los componentes
        this.setResizable(false);                               // hacemos que la ventana no sea redimiensionable
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);    // hacemos que cuando se cierre la ventana termina todo proceso
    }
 private class CheckB implements ActionListener{
	 @Override
	    public void actionPerformed(ActionEvent e) {
		 if(check.isSelected()){
			 caja.setEchoChar((char)0);
		 }
		 else{
			 caja.setEchoChar('*');
		 }
	 }
 }
    private void inicializarComponentes() {
        // creamos los componentes
        texto = new JLabel();
        caja = new JPasswordField();
        boton = new JButton();
        texto2 = new JLabel();
        texto3 = new JLabel();
        texto4 = new JLabel();
        texto5 = new JLabel();
        texto_seed = new JLabel();
        texto_size = new JLabel();
        caja3 = new JTextField();
        caja2 = new JTextField();
        seedBox = new JTextField();
        check= new JCheckBox();
        combo= new JComboBox();
        combo_size= new JComboBox();
        // configuramos los componentes
        texto.setText("Private key");    // colocamos un texto a la etiqueta
        texto.setBounds(50, 20, 100, 25);   // colocamos posicion y tamanio al texto (x, y, ancho, alto)
        caja.setBounds(150, 20, 100, 25);   // colocamos posicion y tamanio a la caja (x, y, ancho, alto)
        caja.setEchoChar('*');
        texto2.setText("Public key");    // colocamos un texto a la etiqueta
        texto2.setBounds(50, 50, 100, 25);   // colocamos posicion y tamanio al texto (x, y, ancho, alto)
        caja2.setBounds(150, 50, 100, 25); 
        texto3.setText("Generated key");    // colocamos un texto a la etiqueta
        texto3.setBounds(50, 80, 100, 25);   // colocamos posicion y tamanio al texto (x, y, ancho, alto)
        Font font1 = new Font("SansSerif", Font.BOLD, 12);
        texto4.setFont(font1);
        texto4.setText("Show password");    // colocamos un texto a la etiqueta
        
        texto4.setBounds(50, 130, 200, 50);
        texto5.setFont(font1);
        texto5.setText("mode");    // colocamos un texto a la etiqueta
        
        texto5.setBounds(50, 155, 200, 50);
        texto_size.setFont(font1);
        texto_size.setText("size");    // colocamos un texto a la etiqueta
        
        texto_size.setBounds(50, 180, 200, 50);
        caja3.setBounds(150, 80, 100, 25);
        caja3.setEditable(false);
        boton.setText("generate");   // colocamos un texto al boton
        boton.setBounds(50, 110, 200, 30);  // colocamos posicion y tamanio al boton (x, y, ancho, alto)
        boton.addActionListener(this);      // hacemos que el boton tenga una accion y esa accion estara en esta clase
        // adicionamos los componentes a la ventana
        check.setBounds(150,145,20,20);
        check.addActionListener(new CheckB());
        combo.addItem("alphanumeric");
        combo.addItem("numbers");
        combo.addItem("alphanumeric + signs");
        combo.addItem("classic");
        combo.setBounds(90,170,160,20);
        combo_size.addItem("longest key");
        combo_size.addItem("4");
        combo_size.addItem("8");
        combo_size.addItem("16");
        combo_size.addItem("32");
        combo_size.setBounds(90,195,160,20);
        combo_size.setEditable(true);

        seedBox.setBounds(90,225,160,20);
        seedBox.setText("0");

        texto_seed.setFont(font1);
        texto_seed.setText("seed");
        texto_seed.setBounds(50, 210, 200, 50);
        this.add(texto);
        this.add(caja);
        this.add(check);
        this.add(texto2);
        this.add(caja2);
        this.add(texto3);
        this.add(texto4);
        this.add(texto5);
        this.add(texto_size);
        this.add(caja3);
        this.add(boton);
        this.add(combo);
        this.add(combo_size);

        this.add(seedBox);
        this.add(texto_seed);
        
    }

    @Override
    public void actionPerformed(ActionEvent e) {
    	
    	int mode= combo.getSelectedIndex();
    	int seed;
        String nombre = caja.getText();
        String nombre2 = caja2.getText();// obtenemos el contenido de la caja de texto
        try {
        	String nombre3;
        	if(mode<3) {
        		int size;
        		String raw_number=combo_size.getSelectedItem().toString();
        		String raw_seed=seedBox.getText();
        		if(raw_number.equals("longest key")) {
        			size=0;
        		}
        		else {
        			size= Integer.parseInt(raw_number);
        		}
        		seed= Integer.parseInt(raw_seed);

    			nombre3= Encoder3.encrypt(nombre2, nombre,mode,size,seed);
        	}
        	else {

    			nombre3= Encoder2.encrypt(nombre2, nombre);
        	}
        	StringSelection stringselection=new StringSelection(nombre3);
        	Clipboard clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
        	clipboard.setContents(stringselection, null);
	        JOptionPane.showMessageDialog(this, "new key:  '" + nombre3+ "' copied to clipboard" );
	        
	        caja3.setText(nombre3);
	        //Saver.SaveFile("claves.txt", nombre2);
	        
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}   // mostramos un mensaje (frame, mensaje)
    }

    public static void main(String[] args) {
        ventana V = new ventana();      // creamos una ventana
        V.setVisible(true);             // hacemos visible la ventana creada
    }
}