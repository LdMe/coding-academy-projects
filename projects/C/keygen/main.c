#include "keygen.h"

int main(int argc, char **argv)
{
    if(argc < 3) {
        printf("too few arguments\n");
        return (1);
    }
    char *pass1 =argv[1];
    char *pass2 =argv[2];
    char *result = encrypt(pass1,pass2);
    printf("%s", result);
}
