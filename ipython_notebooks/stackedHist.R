library(dplyr)
library(ggplot2)
library(tidyr)

d = read.csv('Repos/tangrams_replication/ipython_notebooks/posTagged.csv', header =T) %>%
  filter(sender == "director") %>%
  group_by(roundNum) %>%
  summarize(numWords = sum(numWords),
            NN = sum(NNnum)/sum(numWords),
            VB = sum(VBnum)/sum(numWords),
            DT = sum(DTnum)/sum(numWords),
            PRP = sum(PRPnum)/sum(numWords),
            IN = sum(INnum)/sum(numWords),
            TO = sum(TOnum)/sum(numWords),
            RB = sum(RBnum)/sum(numWords)) %>%
  mutate(OTHER = (1 - NN - VB - DT - PRP -
                      IN - TO - RB)) %>%
  gather(POS, prop, NN:OTHER) %>%
  select(roundNum, POS, prop) 
  
head(d)

ggplot(d, aes(x = roundNum, y = prop, fill = POS)) +
  geom_bar(stat = "identity") +
  scale_fill_brewer(palette = "Set1") +
  theme_bw()
