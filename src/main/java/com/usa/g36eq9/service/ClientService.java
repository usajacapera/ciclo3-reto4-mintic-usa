package com.usa.g36eq9.service;


import com.usa.g36eq9.model.Client;
import com.usa.g36eq9.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getAll(){
        return clientRepository.getAll();
    }

    public Optional<Client> getClient(int idClient){
        return clientRepository.getClient(idClient);
    }

    public Client save(Client client){
        if(client.getIdClient() == null){
            return clientRepository.save(client);
        }else{
            Optional<Client> caux = clientRepository.getClient(client.getIdClient());
            if(caux.isPresent()){
                return client;
            }else{
                return clientRepository.save(client);
            }
        }
    }
    public Client update(Client client){
        if(client.getIdClient() != null){
            Optional<Client> q = clientRepository.getClient(client.getIdClient());
            if(q.isPresent()){
                if(client.getName() != null){
                    q.get().setName(client.getName());
                }
                if(client.getEmail() != null){
                    q.get().setEmail(client.getEmail());
                }
                if(client.getPassword() != null){
                    q.get().setPassword(client.getPassword());
                }
                if(client.getAge() != null){
                    q.get().setAge(client.getAge());
                }
                if(client.getMessages() != null){
                    q.get().setMessages(client.getMessages());
                }
                clientRepository.save(q.get());
                return q.get();
            }else{
                return client;
            }
        }else{
            return client;
        }
    }
    public void delete(int idClient){
        Optional<Client> c = clientRepository.getClient(idClient);
        if(c.isPresent()){
            clientRepository.delete(c.get());
        }
    }
    public void deleteAll(){
        clientRepository.deleteAll();
    }
}
