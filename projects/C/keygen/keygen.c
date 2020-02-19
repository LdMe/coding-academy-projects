/*
** keygen.c
** File description:
** main keygen functions
*/
#include "keygen.h"
char *lista= "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

int str_len(char *str)
{
    int counter = 0;
    while (*str !='\0' ) {
        str++;
        counter++;
    }
    return (counter);
}
int is_minus(char c)
{
    if (c > 96 && c < 123) {
        return (1);
    }
    return (0);
            
}
int is_mayus(char c)
{
    if (c > 64 && c < 91) {
        return (1);
    }
    return (0);
            
}
int is_num(char c)
{
    if ( c > 47 && c < 58) {
        return (1);
    }
    return (0);
            
}
void lower(char *a)
{
    *a = *a + 32;
}
void upper(char *a)
{
    *a = *a - 32;
}
int abs(int n)
{
    if(n < 0) {
        return -n;
    }
    return n;
}
int find(char *lista,char word){
    int len = str_len(lista);
	for (int i =0; i < len; i++){
		if(lista[i] == word){
			return i;
		}
	}
	
	
	return -1;
}
int mcd(int x, int y)
{	
	int max,min;
	if (x > y) {
		max= x;
		min= x;
	}
	else if (y > x) {
		max= y;
		min=x;
	}
	else {
		return x;
	}
	
	for (int i = min; i > 0; i--) {
		if (max % i==0 && min% i == 0) {
			return i;
		}
	}
	return -1;
}
char *repair(char **str)
{
    if (str[1] == "f") { // mayus false
        if (str[2] == "t") { // minus true
            for (int i = 0; i < str_len(str[0]); i++) {
                if (is_num(str[0][i]) == 0) {
                    upper(&str[0][i]);
                }
            }
        }
        else{
            str[0][0] = lista[find(lista, lista[find(lista, str[0][0]) + 26])];
            
        }
    }
    if ( str[2] == "f") {
        if (str[1] == "t") { // minus true
            for (int i = 0; i < str_len(str[0]); i++) {
                if (is_num(str[0][i]) == 0) {
                    lower(&str[0][i]);
                }
            }
        }
        else{
            str[0][0] = lista[find(lista, lista[find(lista, str[0][0]) + 10])];
            
        }
    }
    if (str[3] == "f") {
        int may = 0;
        int min = 0;

        for (int i = 0; i < str_len(str[0]);i++) {
            if(is_mayus(str[0][i]) == 1) {
                if (may == 1) {
                    str[0][i] = lista[find(lista,str[0][i]) % 10];
                    break;
                }
                may = 1;
            }
            else {
                if (min == 1) {
                    str[0][i] = lista[find(lista,str[0][i]) % 10];
                    break;
                }
                min = 1;
            }
        }
    }
    return str[0];
}
char *encrypt(char *word, char *key)
{
    int len =  str_len(lista);
    int len1 = str_len(word);
    int len2 = str_len(key);
    char *str1, *str2;
    char **results = malloc(sizeof(char*) * 4);
    for (int i = 1; i < 4; i++) {
        results[i] = malloc(sizeof(char) * 2);
        results[i] = "f";
    }
    if(len1 < len2) {
        int temp = len1;
        len1 = len2;
        len2 = temp;
        str1 =key;
        str2 = word;
    } else {
        str1  = word;
        str2 = key;
    }
    results[0] = malloc(sizeof(char) * (len1 + 1));
    for (int  i = 0; i < len1; i++) {
        int x = find(lista,str1[i]);
        int y = 0;
        y = find(lista, str2[i % len2]);
        int z= (mcd(y+1,x+1) * abs(x-y)) % len;
        results[0][i] =lista[z];
        if (is_mayus(lista[z])) {
            results[1]="t";
        }
        if (is_minus(lista[z])) {
            results[2]="t";
        }
        if (is_num(lista[z])) {
            results[3]="t";
        }
    }
    
    return (repair(results));
    
}
