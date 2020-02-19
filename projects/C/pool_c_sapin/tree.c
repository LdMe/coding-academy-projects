/*
** EPITECH PROJECT, 2019
** tree.c
** File description:
** function to make a tree of the given size
*/



//-----------------------------------------------------------
int draw_square(int size, int total_size,int base_size)
{
    
    int local_size = (total_size - size) / 2;
    if (size <= base_size) {
        for (int i = 0; i < local_size; i++) {
             my_putchar(' ');
        }
        for (int i = 0; i < base_size; i++) {
             my_putchar('*');
        }
        
    }
    else {
        
        draw_square(size -2, total_size, base_size);
        my_putchar('\n');
        for (int i = 0; i < local_size; i++) {
            my_putchar(' ');
        }
        for (int  i = 0; i < size; i++) {
             my_putchar('*');
        }
    }
    return (size);
}
int count_columns(int size)
{
    
    int counter = 1;
    if (size <= 1) {
        counter = 1;
        for (int i = 0; i < 3; i++) {
            counter += 2;
        }
        return (counter);
    }
    int offset = ( (size ) /2) * 2;
    
    counter = count_columns(size - 1) - offset;
    for (int i = 0; i < size + 2; i++) {
            counter += 2;
        }
    return (counter);
}
//-------------------------------------------------------
void tree(int size)
{
    int counter = 0;
    int trunk_width = (size / 2) * 2 + 1;
    int width = count_columns(size);
    int local_size = (width - trunk_width ) / 2;
    int local_width =count_columns(1) ;
    int local_width_old = 1;
    for (int i = 1; i <= size; i++) {
        int offset;
        offset = ((i ) / 2 ) * 2;
        local_width =count_columns(i);
        draw_square(local_width,width,local_width_old - offset);
        
        local_width_old =local_width;
        my_putchar('\n');
        
    }
    for (int line = 0; line < size; line++) {
        for (int i = 0; i < local_size; i++) {
            my_putchar(' ');
        }
        for (int i = 0; i < trunk_width; i++) {
            my_putchar('|');
        }
        my_putchar('\n');
    }
}
