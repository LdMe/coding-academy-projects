package generator;

import java.util.Arrays;
import java.util.Random;


public class Encoder3 {
private static String minusculas= "abcdefghijklmnopqrstuvwxyz";
private static String mayusculas= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
private static String numeros= "1234567890986543210";
private static String simbolos=".,:;-_!?¿()/%$&·+*=<>";
private static String lista=minusculas+mayusculas+numeros+simbolos;
private static String listat=lista;
private static Random random;
private static int _seed;


public static String encrypt(String word,String key,int mode, int size,int seed){
	String result= "";
	boolean minus= false;
	boolean mayus= false;
	boolean num = false;
	_seed=seed;
	random= new Random(seed);
	if(mode==0) {
		lista=minusculas+mayusculas+numeros;
	}
	else if(mode==1) {
		lista=numeros;
		System.out.println(lista);
	}
	else if(mode==2) {
		lista=simbolos+minusculas+mayusculas+numeros;	
	}
	
	String[] lista1= lista.split("");
	String[] lista2= word.split("");
	String[] lista3= key.split("");
	if(lista3.length>lista2.length){
		String[] temp= Arrays.copyOf(lista2, lista2.length);
		lista2=Arrays.copyOf(lista3, lista3.length);
		lista3= Arrays.copyOf(temp, temp.length);
	}
	if(size==0) {
		size= lista2.length;
	}

	String[] resultList = new String[size];
	for(int i =0; i < size;i++){
		int x= find(listat.split(""),lista2[(i/lista2.length+ i) %lista2.length]);
		int y = 0;
		try{
		y= find(listat.split(""),lista3[(i/lista3.length+ i) % lista3.length]);}
		catch(Exception e){
			System.out.println("here's the problem");
			e.printStackTrace();
		}
		int z= (int) Math.abs((random.nextInt()+  mcd(y+1,x+1)+2*(x+y))% lista1.length);

		System.out.println(z);
		if(z <10){
			num = true;
			
		}
		else if(z < 36){
			minus = true;
		}
		else{
			mayus=true;
		}

		
		try{
			resultList[i]=lista1[z];
		} catch (Exception e1) {
			System.out.print("i, z: ");

			System.out.println(i);
			System.out.println(z);
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}	
			
	}
	//resultList=repair(resultList,word.split(""),mayus,minus,num);
	result= String.join("", resultList);
	System.out.print(mayus);
	System.out.println(minus);
	System.out.println(num);
	
	
	
	return result;
}
private static String[] repair(String[] resultList, String[] wordList, boolean mayus,boolean minus, boolean num ){
	if(! mayus){
		if(minus){
		for(int i =0;i < resultList.length;i++){
			if(find(lista.split(""),resultList[i])>9){
				resultList[i]=resultList[i].toUpperCase();
				break;
			}
		}
		}
		else{
			
			resultList[0]=lista.split("")[ find(lista.split(""),lista.split("")[find(lista.split(""),resultList[0])+26])];
		}
	}
	if(!minus){
		if(mayus){
		for(int i =0;i < resultList.length;i++){
			if(find(lista.split(""),resultList[i])>9){
				resultList[i]=resultList[i].toLowerCase();
				break;
			}
		}
		}
		else{
			
			resultList[1]=lista.split("")[ find(lista.split(""),lista.split("")[find(lista.split(""),resultList[0])+10])];
			}
	}
	if(!num){
		boolean min=false;
		boolean may = false;
		for(int i =0;i < resultList.length;i++){
			if(find(lista.split(""),resultList[i])>36){
				if(may){
					resultList[i]=lista.split("")[(find(lista.split(""),resultList[i])%10)];
					break;
				}
				may= true;
				
			}
			else{
				if(min){
					resultList[i]=lista.split("")[(find(lista.split(""),resultList[i])%10)];
					break;
				}
				min= true;
			}
		}
	}
	
	return resultList;
}
private static int find(String[] lista, String word){
	int len = lista.length;
	for (int i =0; i< len; i++){
		if(lista[i].equals(word)){
			return i;
		}
	}
	
	
	return -1;
}

private static int mcd(int x, int y){
	
	int max,min;
	if(x > y){
		max= x;
		min= x;
	}
	else if (y > x){
		max= y;
		min=x;
	}
	else{
		return x;
	}
	
	for(int i = min; i > 0; i--){
		if(max % i==0 && min% i == 0){
			return i;
		}
	}
	return -1;
}
}
