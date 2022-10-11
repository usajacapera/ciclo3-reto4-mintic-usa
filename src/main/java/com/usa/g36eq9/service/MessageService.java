package com.usa.g36eq9.service;

import com.usa.g36eq9.model.Message;
import com.usa.g36eq9.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    public List<Message> getAll(){
        return messageRepository.getAll();
    }

    public Optional<Message> getMessage(int idMessage){
        return messageRepository.getMessage(idMessage);
    }

    public Message save(Message m){
        if(m.getIdMessage() == null){
            return messageRepository.save(m);
        }else{
            Optional<Message> maux = messageRepository.getMessage(m.getIdMessage());
            if(maux.isPresent()){
                return m;
            }else{
                return messageRepository.save(m);
            }
        }
    }

    public Message update(Message m){
        if(m.getIdMessage() != null){
            Optional<Message> q = messageRepository.getMessage(m.getIdMessage());
            if(q.isPresent()){
                if(m.getMessageText() != null){
                    q.get().setMessageText(m.getMessageText());
                }
                if(m.getClient() != null){
                    q.get().setClient(m.getClient());
                }
                messageRepository.save(q.get());
                return q.get();
            }else{
                return m;
            }
        }else{
            return m;
        }
    }
    public boolean delete(int idMessage){
        boolean flag = false;
        Optional<Message> m = messageRepository.getMessage(idMessage);
        if(m.isPresent()){
            messageRepository.delete(m.get());
            flag = true;
        }
        return flag;
    }
}
