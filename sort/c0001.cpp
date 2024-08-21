#include<stdio.h>
#include<stdlib.h>
#include<time.h>

#define ELMSIZE 100

void printarr(const char *str, int* p, unsigned int len) {
	puts(str);

	for (unsigned int i = 0; i < len; i++) {
		printf("matrix[%d]:%d\n", i, p[i]);
	}

	puts("");
}

int* input() {
	printf("要素数:%d\n", ELMSIZE);

	int* p = (int*)calloc(ELMSIZE, sizeof(int));
	if (nullptr == p)exit(1);

	for (int i = 0; i < ELMSIZE; i++) {
		p[i] = rand();
	}
	
	printarr("input", p, ELMSIZE);
	return p;
}

void change(int* p0, int* p1) {
	int temp = *p0;
	*p0 = *p1;
	*p1 = temp;
}

void checkans(int* p, int len) {
	int i;
	for (i = 0; i < len - 1; i++)
		if (p[i] > p[i + 1])
			break;

	if (i == len - 1)	puts(">>success");
	else				puts(">>miss");

	free(p);
}

void kari(int* p, int len){
	for (int i = 0; i < len; i++)
		for (int j = i; j < len; j++)
			if (p[i] > p[j])change(&p[i], &p[j]);
}

void baburu0(int* p, int len){
	for (int i = 0; i < len; i++)
		for (int j = len - 1; j > i; j--)
			if (p[j - 1] > p[j])
				change(&p[j - 1], &p[j]);
}

void baburu1(int* p,int len) {
	for (int i = 0; i < len; i++) {
		int count = 0;

		for (int j = len - 1; j > i; j--)
			if (p[j - 1] > p[j]) {
				change(&p[j - 1], &p[j]);
				count++;
			}

		if (count == 0)break;
	}
}

void baburu2(int* p, int len) {
	int i = 0;
	while (i < len - 1) {
		int lastswap = len - 1;

		for (int j = len - 1; j > i; j--)
			if (p[j - 1] > p[j]) {
				change(&p[j - 1], &p[j]);
				lastswap = j;
			}

		i = lastswap;
	}
}

void shuttle(int *p,int len) {
	for (int j, i = 1; i < len; i++) {
		int temp = p[i];
		for (j = i; p[j - 1] > temp;j--)
			p[j] = p[j - 1];
		p[j] = temp;
	}
}

void shell(int* p, int len) {
	for (int h = len / 2; h > 0; h /= 2)
		for (int j, i = h; i < len; i++) {
			int temp = p[i];

			for (j = i - h; j >= 0 && p[j] > temp; j -= h)
				p[j + h] = p[j];

			p[j + h] = temp;
		}
}

void frepuency(int* p, int len) {
	int max = p[0];
	for (int i = 0; i < len; i++)
		if (max < p[i])
			max = p[i];

	int* f = (int*)calloc(max + 1, sizeof(int));
	int* n = (int*)calloc(len, sizeof(int));
	if (f == NULL || n == NULL)exit(1);

	for (int i = 0; i < max; i++)		f[i] = 0;
	for (int i = 0; i < len; i++)		f[p[i]]++;
	for (int i = 1; i <= max; i++)		f[i] += f[i - 1];
	for (int i = len - 1; i >= 0; i--)	n[--f[p[i]]] = p[i];
	for (int i = 0; i < len; i++)		p[i] = n[i];

	free(f);
	free(n);
}

int main(void) {
	srand((unsigned int)time(NULL));

	int* p = input();
	frepuency(p, ELMSIZE);
	printarr("frepuency", p, ELMSIZE);
	
	checkans(p, ELMSIZE);
	return 0;
}