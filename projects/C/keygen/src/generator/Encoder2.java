package generator;

import java.util.Arrays;

public class Encoder2 {
private static String lista= "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";


public static String encrypt(String word,String key){
	String result= "";
	boolean minus= false;
	boolean mayus= false;
	boolean num = false;
	String[] lista1= lista.split("");
	String[] lista2= word.split("");
	String[] lista3= key.split("");
	if(lista3.length>lista2.length){
		String[] temp= Arrays.copyOf(lista2, lista2.length);
		lista2=Arrays.copyOf(lista3, lista3.length);
		lista3= Arrays.copyOf(temp, temp.length);
	}

	String[] resultList = new String[lista2.length];
	for(int i =0; i < lista2.length;i++){
		int x= find(lista1,lista2[i]);
		int y = 0;
		try{
		y= find(lista1,lista3[i % lista3.length]);}
		catch(Exception e){
			System.out.println("here's the problem");
			e.printStackTrace();
		}
		int z= (mcd(y+1,x+1)* Math.abs(x-y))% lista1.length;
		if(z <10){
			num = true;
			
		}
		else if(z < 36){
			minus = true;
		}
		else{
			mayus=true;
		}
		resultList[i]=lista1[z];
	}
	resultList=repair(resultList,word.split(""),mayus,minus,num);
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
